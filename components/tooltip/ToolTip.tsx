import * as React from "react"
import {createRef, ReactNode, RefObject} from "react"
import {
    AsyncStorage,
    LayoutRectangle,
    TouchableHighlight, TouchableWithoutFeedback,
    TouchableWithoutFeedbackComponent,
    View,
    ViewStyle
} from "react-native";
import Styles from "../Styles";
import Portal from "../portal/Portal";
import ScreenUtil from "../util/ScreenUtil";
import * as Animatable from "react-native-animatable";
import ToolTipArrow, {ArrowDirection} from "./ToolTipArrow";
import Icon from "../Icon";
import Overlay from "../Overlay";

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

interface State {
    toolTip?: Partial<LayoutRectangle>;
    target?: LayoutRectangle;
    show: boolean;
    loaded: boolean;
}

interface PositionResult {
    toolTipX: number;
    toolTipY: number;
    arrowX: number;
    arrowY: number;
    arrowDirection: ArrowDirection;
}

const borderRadius = 2;

export default class ToolTip extends React.Component<ToolTipProps, State> {
    private targetRef: RefObject<View> = createRef();
    private toolTipRef: RefObject<any> = createRef();
    private arrowRef: RefObject<any> = createRef();
    public state: State = {
        show: this.props.show,
        loaded: false
    };
    private arrowHeight = 10;
    private arrowWidth = 20;
    private timeout;

    public render() {
        if (!this.state.loaded) {
            return null;
        }

        if (!this.props.enabled) {
            return this.props.children;
        }

        const fullWidth = ScreenUtil.fullWidth();
        const fullHeight = ScreenUtil.fullHeight();
        const {
            children,
            maxWidth = fullWidth * 0.6,
            backgroundColor = Styles.isDarkMode ? Styles.primaryColor : "#eee",
            view, overlay, overlayStyle, overlayOnClose,
            shouldCloseOnOverlayClick,
        } = this.props;
        const {show} = this.state;
        let toolTip = null;
        if (show) {
            const positions = this._autoPosition();
            toolTip = (
                <Overlay
                    enabled={overlay}
                    onPress={(e) => {
                        if (overlayOnClose) overlayOnClose();
                        if (shouldCloseOnOverlayClick) this._close(e);
                    }}
                >
                    <Animatable.View
                        ref={this.toolTipRef}
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
                                if (this.state.toolTip) {
                                    return null;
                                }
                                this.setState({
                                    toolTip:
                                        {
                                            height: Math.ceil(layout.height),
                                            width: Math.ceil(layout.width),
                                            x: layout.x,
                                            y: layout.y,
                                        }
                                })
                            }}
                        >
                            <View style={{marginBottom: 5, flexDirection: "row", justifyContent: "flex-end"}}>
                                <Icon
                                    onPress={this._close}
                                    name="times"
                                    customSize={14}
                                />
                            </View>
                            {view}
                        </View>
                    </Animatable.View>
                    <Animatable.View
                        ref={this.arrowRef}
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
                            width={this.arrowWidth}
                            height={this.arrowHeight}
                        />
                    </Animatable.View>
                </Overlay>
            );
        }

        /**
         * <View
         style={
                            overlay && {
                                flex: 1,
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                backgroundColor: 'rgba(206, 88, 71, 0.7)',
                                width: ScreenUtil.fullWidth(),
                                height: "100%",
                                ...overlayStyle,
                            }}
         >
         * */


        return (
            <React.Fragment>
                <View
                    ref={this.targetRef}
                    onLayout={() => {
                        /**
                         * setTimeout Hack!
                         * https://stackoverflow.com/a/29842652/2598292
                         */
                        this.timeout = setTimeout(() => {
                            // if (this.timeout) {
                            //     clearTimeout(this.timeout)
                            // }

                            this.targetRef.current.measure((x, y, width, height, pageX, pageY) => {
                                const target = {x: pageX, y: pageY, width, height};
                                this.setState({target})
                            })
                        }, 500)
                    }}
                >
                    {children}
                </View>
                {
                    show &&
                    <Portal>
                        {toolTip}
                    </Portal>
                }
            </React.Fragment>
        )
    }

    public async componentDidMount() {
        const {storageKey} = this.props;
        if (storageKey) {
            const disable = await AsyncStorage.getItem(storageKey);
            this.setState({
                show: disable !== "true",
                loaded: true,
            })
        } else {
            this.setState({loaded: true})
        }

    }

    public componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    public componentWillReceiveProps(nextProps: Readonly<ToolTipProps>, nextContext: any) {
        if (nextProps.show != this.props.show) {
            this.setState({show: nextProps.show})
        }
    }

    private _getLeftPositions(): { toolTipX: number, arrowX: number } {
        const {toolTip, target} = this.state;


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

        return {
            toolTipX: left,
            arrowX,
        }
    }

    private _belowPosition(): PositionResult {
        const {arrowHeight} = this;
        const {toolTip, target} = this.state;

        return {
            toolTipY: (target.y + target.height + arrowHeight),
            arrowY: target.y + target.height + 1,
            arrowDirection: "up",
            ...this._getLeftPositions(),
        };
    }

    private _topPosition(): PositionResult {
        const {arrowHeight} = this;
        const {toolTip, target} = this.state;

        return {
            toolTipY: target.y - toolTip.height - (arrowHeight),
            arrowY: target.y - arrowHeight - 1,
            arrowDirection: "down",
            ...this._getLeftPositions(),
        }
    }

    private _autoPosition(): PositionResult {
        const fullHeight = ScreenUtil.fullHeight();
        const {toolTip, target} = this.state;
        const {arrowHeight} = this;
        console.log(this.state);
        if (!target || !toolTip) {
            return null
        }
        if (target.y + target.height + arrowHeight >= fullHeight) {
            return this._topPosition();
        }

        if (target.y - toolTip.height - arrowHeight <= 0) {
            return this._belowPosition();
        }
        return this._topPosition();
    }

    public _open = () => {
        this.setState({show: true});
    };

    public _close = async (e) => {
        console.log('close tooltip');
        const {onClose, storageKey} = this.props;
        await Promise.all([
            this.arrowRef.current.fadeOut(1000),
            this.toolTipRef.current.fadeOut(1000)
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

        this.setState({show: false})
    }

    // computeTopGeometry: ComputeGeometry = (displayArea, fromRect, contentSize, arrowSize) => {
    //     const origin = {
    //         x: Math.min(
    //             displayArea.x + displayArea.width - contentSize.width,
    //             Math.max(displayArea.x, fromRect.x + (fromRect.width - contentSize.width) / 2),
    //         ),
    //         y: fromRect.y - contentSize.height - arrowSize.height,
    //     };
    //
    //     const anchor = { x: fromRect.x + fromRect.width / 2, y: fromRect.y };
    //
    //     return { origin, anchor, placement: 'top' };
    // };


    // computeBottomGeometry: ComputeGeometry = (displayArea, fromRect, contentSize, arrowSize) => {
    //     const origin = {
    //         x: Math.min(
    //             displayArea.x + displayArea.width - contentSize.width,
    //             Math.max(displayArea.x, fromRect.x + (fromRect.width - contentSize.width) / 2),
    //         ),
    //         y: fromRect.y + fromRect.height + arrowSize.height,
    //     };
    //
    //     const anchor = { x: fromRect.x + fromRect.width / 2, y: fromRect.y + fromRect.height };
    //
    //     return { origin, anchor, placement: 'bottom' };
    // };
    //
    // computeAutoGeometry = (displayArea: Rect, fromRect: Rect, contentSize: Size, arrowSize: Size): Geometry => {
    //     let geom: Geometry | null = null;
    //     const placements: Placement[] = ['left', 'top', 'right', 'bottom'];
    //     for (let i = 0; i < 4; i += 1) {
    //         const placement = placements[i];
    //         geom = computeGeometry(contentSize, placement, fromRect, displayArea, arrowSize);
    //         const { origin } = geom;
    //
    //         if (
    //             origin.x >= displayArea.x &&
    //             origin.x <= displayArea.x + displayArea.width - contentSize.width &&
    //             origin.y >= displayArea.y &&
    //             origin.y <= displayArea.y + displayArea.height - contentSize.height
    //         ) {
    //             break;
    //         }
    //     }
    //     return geom as Geometry;
    // };

}

// const computeLeftGeometry: ComputeGeometry = (displayArea, fromRect, contentSize, arrowSize) => {
//     const origin = {
//         x: fromRect.x - contentSize.width - arrowSize.width,
//         y: Math.min(
//             displayArea.y + displayArea.height - contentSize.height,
//             Math.max(displayArea.y, fromRect.y + (fromRect.height - contentSize.height) / 2),
//         ),
//     };
//
//     const anchor = { x: fromRect.x, y: fromRect.y + fromRect.height / 2 };
//
//     return { origin, anchor, placement: 'left' };
// };
//
// const computeRightGeometry: ComputeGeometry = (displayArea, fromRect, contentSize, arrowSize) => {
//     const origin = {
//         x: fromRect.x + fromRect.width + arrowSize.width,
//         y: Math.min(
//             displayArea.y + displayArea.height - contentSize.height,
//             Math.max(displayArea.y, fromRect.y + (fromRect.height - contentSize.height) / 2),
//         ),
//     };
//
//     const anchor = { x: fromRect.x + fromRect.width, y: fromRect.y + fromRect.height / 2 };
//
//     return { origin, anchor, placement: 'right' };
// };
//
// const computeAutoGeometry = (displayArea: Rect, fromRect: Rect, contentSize: Size, arrowSize: Size): Geometry => {
//     let geom: Geometry | null = null;
//     const placements: Placement[] = ['left', 'top', 'right', 'bottom'];
//     for (let i = 0; i < 4; i += 1) {
//         const placement = placements[i];
//         geom = computeGeometry(contentSize, placement, fromRect, displayArea, arrowSize);
//         const { origin } = geom;
//
//         if (
//             origin.x >= displayArea.x &&
//             origin.x <= displayArea.x + displayArea.width - contentSize.width &&
//             origin.y >= displayArea.y &&
//             origin.y <= displayArea.y + displayArea.height - contentSize.height
//         ) {
//             break;
//         }
//     }
//     return geom as Geometry;
// };