import * as React from "react"
import {Animated} from "react-native";
import {PanGestureHandler, PanGestureHandlerStateChangeEvent, State} from "react-native-gesture-handler";
import Styles from "./Styles";

interface DraggableProps {
    onDrag: (event: PanGestureHandlerStateChangeEvent)=>void;
}

export default class Draggable extends React.Component<DraggableProps> {
    private translateXY = new Animated.ValueXY({x: 0, y: 0});
    private _onGestureEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: this.translateXY.x,
                    translationY: this.translateXY.y,
                },
            },
        ],
        {useNativeDriver: true}
    );

    public render() {
        const {onDrag, children} = this.props;
        return (
            <PanGestureHandler
                onGestureEvent={this._onGestureEvent}
                onHandlerStateChange={(e) => {
                    const {state, translationX, translationY} = e.nativeEvent;
                    if (state === State.BEGAN || state === State.ACTIVE) {
                        this.translateXY.setValue({x: translationX, y: translationY});
                    } else {
                        this.translateXY.setValue({x: 0, y: 0});
                    }
                    onDrag(e)
                }}
            >
                <Animated.View
                    style={[
                        {
                            transform: [
                                {translateX: this.translateXY.x},
                                {translateY: this.translateXY.y},
                            ],
                        },
                        {
                            zIndex: Styles.toastZIndex,
                        }
                    ]}
                >
                    {children}
                </Animated.View>
            </PanGestureHandler>
        )
    }
}