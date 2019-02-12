import * as React from 'react'
import {NavigationProps} from "../demotype";
import {Animated, Image, LayoutRectangle, View} from "react-native";
import {PanGestureHandler, RectButton, State} from "react-native-gesture-handler";
import ChungText from "../../ChungText";
import FadeIn from "../../FadeIn";

interface TestState {
    targetIsVisible: boolean;
    targetLayout?: LayoutRectangle;

}

export default class TestScreen extends React.Component<NavigationProps, TestState> {
    public state: TestState = {targetIsVisible: false}
    private _translateXY = new Animated.ValueXY({x: 0, y: 0});
    private _positionXY = new Animated.ValueXY({x: 0, y: 0});
    private positionListener: string;

    private _onGestureEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: this._translateXY.x,
                    translationY: this._translateXY.y,
                },
            },
        ],

        {useNativeDriver: true}
    );

    public render() {
        const {targetIsVisible} = this.state;
        return (
            <View style={{flex: 1}}>
                <PanGestureHandler
                    onGestureEvent={this._onGestureEvent}
                    onHandlerStateChange={async ({nativeEvent}) => {
                        const {state, translationX, absoluteY, absoluteX, translationY} = nativeEvent;
                        console.log(nativeEvent);
                        if (state === State.BEGAN || state === State.ACTIVE) {
                            this._translateXY.setValue({x: translationX, y: translationY});
                            this.setState({targetIsVisible: true})
                        } else {
                            this._translateXY.setValue({x: 0, y: 0});
                            this.setState({targetIsVisible: false})
                        }
                        this._positionXY.setValue({x: absoluteX, y: absoluteY})
                    }}
                >
                    <Animated.View
                        style={[
                            {
                                transform: [
                                    {translateX: this._translateXY.x},
                                    {translateY: this._translateXY.y},
                                ],
                            },
                            {
                                zIndex: 100,
                            }
                        ]}
                    >
                        <Image
                            style={{height: 100, width: 100}}
                            source={{uri: "https://user-images.githubusercontent.com/7850794/39671125-2d702b42-510a-11e8-9aa4-4c43934b811a.png"}}
                        />
                    </Animated.View>
                </PanGestureHandler>
                {
                    targetIsVisible &&
                    <View
                        onLayout={({nativeEvent: {layout}}) => {
                            this.setState({targetLayout: layout});
                        }}
                        style={{
                            backgroundColor: "red",
                            width: 100,
                            height: 100,
                            position: "absolute",
                            bottom: 0,
                            right: 0
                        }}
                    >
                        <ChungText>fdassdf</ChungText>
                    </View>
                }

            </View>
        );
    }


    componentDidMount() {
        this.positionListener = this._positionXY.addListener(({x, y}) => {
            const {targetLayout} = this.state;
            if (targetLayout && (x >= targetLayout.x && y >= targetLayout.y)) {
                alert("touched")
            }
        })
    }

    componentWillUnmount(): void {
        this._translateXY.removeListener(this.positionListener)
    }
}
