import * as React from "react"
import {Component, ReactNode} from "react"
import {Animated, AsyncStorage} from "react-native";
import {PanGestureHandler, RectButton, State} from 'react-native-gesture-handler';
import {Omit} from "react-navigation";
import {ActionButtonProps} from "./ActionButton";
import Toast from "./Toast";

interface Props extends Omit<ActionButtonProps, "draggable" | "iconColor" | "icon"> {
    view: ReactNode;
}

interface DraggableState {
    loaded: boolean
}

interface OffsetState {
    x: number;
    y: number;
}

export default class Draggable extends Component<Props, DraggableState> {
    public state: DraggableState = {loaded: false};
    private _translateXY = new Animated.ValueXY({x: 0, y: 0});
    private _lastOffset: OffsetState = {x: 0, y: 0};
    private mounted: boolean;
    private _onGestureEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: this._translateXY.x,
                    translationY: this._translateXY.y,
                },
            },
        ],
        {useNativeDriver: false}
    );


    private _onHandlerStateChange = async ({nativeEvent}) => {
        if (nativeEvent.oldState === State.ACTIVE) {
            this._lastOffset.x += nativeEvent.translationX;
            this._lastOffset.y += nativeEvent.translationY;
            this._translateXY.setOffset(this._lastOffset);
            this._translateXY.setValue({x: 0, y: 0});
            const {storageKey} = this.props;
            if (storageKey) {
                await AsyncStorage.setItem(storageKey, JSON.stringify(this._lastOffset));
            }
        }
    };

    public render() {
        if (!this.state.loaded) {
            return null;
        }
        const {view, onPress, containerStyle} = this.props;
        return (
            <PanGestureHandler
                {...this.props}
                onGestureEvent={this._onGestureEvent}
                onHandlerStateChange={this._onHandlerStateChange}
            >
                <Animated.View
                    style={[
                        {
                            transform: [
                                {translateX: this._translateXY.x},
                                {translateY: this._translateXY.y},
                            ],

                        },
                        containerStyle,
                    ]}
                >
                    <RectButton onPress={onPress}>
                        {view}
                    </RectButton>
                </Animated.View>
            </PanGestureHandler>
        );
    }

    public async componentDidMount() {
        this.mounted = true;
        const {storageKey} = this.props;
        if (storageKey) {
            const dataStr = await AsyncStorage.getItem(storageKey);
            if (dataStr) {
                try {
                    this._lastOffset = JSON.parse(dataStr);
                    /*
                     * The offset and values MUST be set in order as follows.
                     * First setOffset, then setValue!
                     */
                    this._translateXY.setOffset(this._lastOffset);
                    this._translateXY.setValue({x: 0, y: 0});

                } catch (e) {
                    Toast.fail({content: `Failure to parse the last X and Y positions for ActionButton`})
                }
            }
        }
        if(this.mounted) {
            this.setState({loaded: true})
        }
    }

    public componentWillUnmount() {
        this.mounted = false;
    }
}