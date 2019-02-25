import * as React from "react"
import {createRef, ReactNode, RefObject} from "react"
import {AsyncStorage, LayoutRectangle, View} from "react-native";
import Styles from "../Styles";
import Portal from "../portal/Portal";
import ScreenUtil from "../util/ScreenUtil";
import * as Animatable from "react-native-animatable";
import ToolTipArrow, {ArrowDirection} from "./ToolTipArrow";
import Icon from "../Icon";

interface ToolTipProps {
    children: any;
    maxWidth?: number;
    backgroundColor?: string;
    show: boolean;
    toolTipView: ReactNode;
    storageKey?: string;
}

interface State {
    toolTip?: Partial<LayoutRectangle>;
    target?: LayoutRectangle;
    show: boolean;
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

    public state: State = {show: this.props.show};
    private arrowHeight = 10;
    private arrowWidth = 20;
    private timeout;
    //private toggling: boolean;

    public render() {

        const fullWidth = ScreenUtil.fullWidth();
        const fullHeight = ScreenUtil.fullHeight();

        const {
            children,
            maxWidth = fullWidth * 0.7,
            backgroundColor = Styles.isDarkMode ? Styles.primaryColor : "#eee",
            toolTipView,
        } = this.props;

        const positions = this._autoPosition();
        const {show} = this.state;
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
                        <Animatable.View
                            ref={this.toolTipRef}
                            style={{
                                position: "absolute",
                                /**
                                 * Hide the tooltip on load by setting its position to fullwidth and fullheight
                                 */
                                left: positions ? positions.toolTipX : fullWidth,
                                top: positions ? positions.toolTipY : fullHeight,
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
                                            onPress={this._toggle}
                                            name="times"
                                            customSize={14}
                                        />
                                    </View>
                                    {toolTipView}
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
                    </Portal>
                }
            </React.Fragment>
        )
    }

    public async componentDidMount() {
        const {storageKey} = this.props;
        if(storageKey) {
            const disable = await AsyncStorage.getItem(storageKey);
            if(disable !== "true")
            this.setState({
                show: true
            })
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

    private _topPosition(): PositionResult {
        const {arrowHeight} = this;
        const {toolTip, target} = this.state;
        if (!target || !toolTip) {
            return null
        }
        let arrowDirection: ArrowDirection = "down";
        let left = target.x;
        let top = target.y - toolTip.height - (arrowHeight);
        let arrowX = target.x;
        let arrowY = target.y - arrowHeight - 1;

        /**
         * When the target view is on the right end of the screen,
         * change the tooltip position so the content won't get overflown outside of the screen.
         */
        if (target.x + toolTip.width > ScreenUtil.fullWidth()) {
            left = (target.x + target.width) - toolTip.width;
            arrowX = target.x;
        }

        /**
         * When the target view is on the left end of the screen and the tooltip content is too wide,
         * change the tooltip position to avoid the overflown problem.
         */

        if (target.x - toolTip.width < 0) {
            left = left < 0 ? 0 : left;
        }

        return {
            toolTipX: left,
            toolTipY: top,
            arrowX,
            arrowY,
            arrowDirection
        }
    }

    private _bottomPosition(): PositionResult {
        const {arrowHeight} = this;
        const {toolTip, target} = this.state;
        if (!target || !toolTip) {
            return null
        }
        // console.log({target});
        // console.log({toolTip});
        let left = target.x;
        let top = (target.y + target.height + arrowHeight);
        let arrowX = target.x;
        let arrowY = target.y + target.height;

        if (target.x + toolTip.width > ScreenUtil.fullWidth()) {

            left = (target.x + target.width) - toolTip.width;
        }

        if (target.x - toolTip.width < 0) {
            left = 0
        }

        return {
            toolTipX: left,
            toolTipY: top,
            arrowX,
            arrowY,
            arrowDirection: "up"
        };
    }

    private _autoPosition(): PositionResult {
        const fullHeight = ScreenUtil.fullHeight();
        const {toolTip, target} = this.state;
        if (!target) {
            return null
        }
        if (target.y + target.height > fullHeight) {
            return this._topPosition();
        }

        if (target.y - toolTip.height < 0) {
            return this._bottomPosition();
        }

        return this._topPosition();
    }

    public _toggle = async () => {
        const {show} = this.state;
        const newState = !show;
        if(!newState) {
            const end = await Promise.all([
                this.arrowRef.current.fadeOut(1000),
                this.toolTipRef.current.fadeOut(1000)
            ]);
        }

        this.setState({show: newState})
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