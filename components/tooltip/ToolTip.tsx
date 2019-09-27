import * as React from "react"
import {forwardRef, ReactNode, RefForwardingComponent, useEffect, useImperativeHandle, useRef, useState} from "react"
import {LayoutRectangle, View, ViewStyle} from "react-native";
import Styles from "../Styles";
import Portal from "../portal/Portal";
import ScreenUtil from "../util/ScreenUtil";
import * as Animatable from "react-native-animatable";
import ToolTipArrow, {ArrowDirection} from "./ToolTipArrow";
import Icon from "../Icon";
import Overlay from "../Overlay";
import AsyncStorage from '@react-native-community/async-storage';

interface ToolTipProps {
    backgroundColor?: string;
    children: any;
    maxWidth?: number;
    enabled: boolean;
    onClose?: () => void;
    overlay?: boolean;
    overlayStyle?: ViewStyle;
    overlayOnClose?: () => void;
    show?: boolean;
    shouldCloseOnOverlayClick?: boolean;
    storageKey?: string;
    view: ReactNode;
}

export interface ToolTipPublicMethods{
    open: ()=> void;
    close: (e: any)=> Promise<void>;
}
interface PositionResult {
    toolTipX: number;
    toolTipY: number;
    arrowX: number;
    arrowY: number;
    arrowDirection: ArrowDirection;
}

const borderRadius = 2;

const ToolTip: RefForwardingComponent<ToolTipPublicMethods, ToolTipProps> = (props: ToolTipProps, ref) => {
    const targetRef = useRef<View>();
    const toolTipRef = useRef<any>();
    const arrowRef = useRef<any>();
    const [show, setShow] = useState(props.show);
    const [loaded, setLoaded] = useState(false);
    const [toolTip, setToolTip] = useState<Partial<LayoutRectangle>>(null);
    const [target, setTarget] = useState<LayoutRectangle>();
    const fullWidth = ScreenUtil.fullWidth();
    const fullHeight = ScreenUtil.fullHeight();
    const {
        children, onClose, storageKey,
        enabled,
        maxWidth = fullWidth * 0.6,
        backgroundColor = Styles.isDarkMode ? Styles.primaryColor : "#eee",
        view, overlay, overlayOnClose,
        shouldCloseOnOverlayClick,
    } = props;

    if (!enabled) {
        return children;
    }

    let arrowHeight = 10;
    let arrowWidth = 20;
    let timeout;

    const _getLeftPositions = (): { toolTipX: number, arrowX: number } => {
        let left = target.x;
        let arrowX = target.x;
        /**
         * When the target view is on the right end of the screen,
         * change the tooltip position so the content won't get overflown outside of the screen.
         */

        if (target.x + toolTip.width > ScreenUtil.fullWidth()) {
            left = (target.x + target.width) - toolTip.width - 2;
        }

        /**
         * When the target view is on the left end of the screen and the tooltip content is too wide,
         * change the tooltip position to avoid the overflown problem.
         */

        if (target.x - toolTip.width < 0) {
            const leftLeaningToolTipWidth = target.x - (toolTip.width / 2);
            if (leftLeaningToolTipWidth > 0) {
                left = leftLeaningToolTipWidth
            } else {
                left = 2;
                arrowX = arrowX + 3
            }
        }

        return {toolTipX: left, arrowX,}
    };

    const open = () => {
        setShow(true)
    };

    const close = async (e) => {
        await Promise.all([
            arrowRef.current.fadeOut(1000),
            toolTipRef.current.fadeOut(1000)
        ]);

        /**
         * If the user provides the storage key, save the key on close so that this tooltip won't show again.
         * Next time, when it finds that the key exists in componentDidMount, this tooltip won't show
         */

        if (storageKey) {
            await AsyncStorage.setItem(storageKey, String(true));
        }

        if (onClose) {
            onClose();
        }
        setShow(false);
    };

    const _belowPosition = (): PositionResult => {
        return {
            toolTipY: (target.y + target.height + arrowHeight),
            arrowY: target.y + target.height + 1,
            arrowDirection: "up",
            ..._getLeftPositions(),
        };
    };

    const _topPosition = (): PositionResult => {
        return {
            toolTipY: target.y - toolTip.height - (arrowHeight),
            arrowY: target.y - arrowHeight - 1,
            arrowDirection: "down",
            ..._getLeftPositions(),
        }
    };

    const _autoPosition = (): PositionResult => {
        const fullHeight = ScreenUtil.fullHeight();
        if (!target || !toolTip) {
            return null
        }
        if (target.y + target.height + arrowHeight >= fullHeight) {
            return _topPosition();
        }

        if (target.y - toolTip.height - arrowHeight <= 0) {
            return _belowPosition();
        }
        return _topPosition();
    };

    useImperativeHandle(ref, () => ({
        open,
        close
    }));

    useEffect(() => {
        if (storageKey) {
            AsyncStorage.getItem(storageKey).then(disable => {
                setShow(disable != "true");
                setLoaded(true);
            });
        }else {
            setLoaded(true);
        }
        return ()=> clearTimeout(timeout)
    }, []);
    //
    // useEffect(()=>{
    //     return ()=> clearTimeout(timeout)
    // },[]);

    useEffect(() => {
        setShow(props.show)
    }, [props.show]);

    let toolTipView = null;

    if(!loaded){
        return null;
    }

    if (show) {
        const positions = _autoPosition();
        toolTipView = (
            <Overlay
                enabled={overlay}
                onPress={(e) => {
                    if (overlayOnClose) overlayOnClose();
                    if (shouldCloseOnOverlayClick) close(e);
                }}
            >
                <Animatable.View
                    ref={toolTipRef}
                    style={{
                        position: "absolute",
                        /**
                         * Hide the tooltip on load by setting its position to fullwidth and fullheight
                         */
                        left: positions ? positions.toolTipX : fullWidth,
                        top: positions ? positions.toolTipY : fullHeight,
                        backgroundColor
                    }}
                    useNativeDriver
                    animation={positions && "fadeIn"}
                >

                    <View
                        style={{
                            padding: Styles.padding,
                            borderRadius,
                            backgroundColor,
                            maxWidth,
                        }}
                        onLayout={({nativeEvent: {layout}}) => {
                            if (toolTip) {
                                return null;
                            }

                            setToolTip({
                                height: Math.ceil(layout.height),
                                width: Math.ceil(layout.width),
                                x: layout.x,
                                y: layout.y,
                            });
                        }}
                    >
                        <View style={{marginBottom: 5, flexDirection: "row", justifyContent: "flex-end"}}>
                            <Icon
                                onPress={close}
                                name="times"
                                customSize={14}
                            />
                        </View>
                        {view}
                    </View>
                </Animatable.View>
                <Animatable.View
                    ref={arrowRef}
                    useNativeDriver
                    animation={positions && "fadeIn"}
                    style={{
                        position: "absolute",
                        left: positions ? positions.arrowX : fullWidth,
                        top: positions ? positions.arrowY : fullHeight,
                    }}
                >
                    <ToolTipArrow
                        direction={positions ? positions.arrowDirection : "up"}
                        color={backgroundColor}
                        width={arrowWidth}
                        height={arrowHeight}
                    />
                </Animatable.View>
            </Overlay>
        );
    }

    return (
        <React.Fragment>
            <View
                ref={targetRef}
                onLayout={() => {
                    /**
                     * setTimeout Hack!
                     * https://stackoverflow.com/a/29842652/2598292
                     */
                    timeout = setTimeout(() => {
                        targetRef.current.measure((x, y, width, height, pageX, pageY) => {
                            setTarget({x: pageX, y: pageY, width, height})
                        })
                    }, 500)
                }}
            >
                {children}
            </View>
            {
                show &&
                <Portal>
                    {toolTipView}
                </Portal>
            }
        </React.Fragment>
    )
};

export default forwardRef(ToolTip);
