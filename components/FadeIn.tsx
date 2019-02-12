import * as React from "react"
import {Animated} from "react-native";

export interface FadeInProps {
    duration?: number;
}

export default class FadeIn extends React.Component<FadeInProps> {
    private toggleAnimation = new Animated.Value(0);

    constructor(props) {
        super(props);
        Animated.timing(this.toggleAnimation, {
            toValue: 1,
            duration: this.props.duration || 200,
            useNativeDriver: true,
        }).start()
    }

    public render() {
        return (
            <React.Fragment>
                <Animated.View
                    style={{
                        opacity: this.toggleAnimation,
                    }}
                >
                    {this.props.children}
                </Animated.View>
            </React.Fragment>
        )
    }
}
