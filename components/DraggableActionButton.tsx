import * as React from "react"
import {Component, ReactNode} from "react"
import {Animated, StyleProp, View, ViewStyle} from "react-native";
import {PanGestureHandler, RectButton, State,} from 'react-native-gesture-handler';

interface Props {
    view: ReactNode;
    onPress?: () => void;
    bottom?: number;
    right?: number;
    containerStyle: StyleProp<ViewStyle>
}

export default class DraggableActionButton extends Component<Props> {
    private _translateX = new Animated.Value(0);
    private _translateY = new Animated.Value(0);
    private _lastOffset = {x: 0, y: 0};
    private _onGestureEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: this._translateX,
                    translationY: this._translateY,
                },
            },
        ],
        {useNativeDriver: false}
    );

    private _onHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            this._lastOffset.x += event.nativeEvent.translationX;
            this._lastOffset.y += event.nativeEvent.translationY;
            this._translateX.setOffset(this._lastOffset.x);
            this._translateX.setValue(0);
            this._translateY.setOffset(this._lastOffset.y);
            this._translateY.setValue(0);
        }
    };

    render() {
        const {view, onPress, containerStyle} = this.props;
        return (
            <View style={containerStyle}>
                <PanGestureHandler
                    {...this.props}
                    onGestureEvent={this._onGestureEvent}
                    onHandlerStateChange={this._onHandlerStateChange}
                >
                    <Animated.View
                        style={[
                            {
                                transform: [
                                    {translateX: this._translateX},
                                    {translateY: this._translateY},
                                ],
                            },
                        ]}
                    >
                        <RectButton onPress={onPress}>
                            {view}
                        </RectButton>
                    </Animated.View>
                </PanGestureHandler>
            </View>
        );
    }
}