import * as React from "react"
import {Animated, StyleProp, ViewStyle} from "react-native";

export interface FadeInProps {
    duration?: number;
    style?: StyleProp<ViewStyle>
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

// class FadeInUp extends React.Component<FadeInProps> {
//
//     private opacityAnim = new Animated.Value(0);
//
//     public constructor(props) {
//         super(props);
//         Animated.timing(this.opacityAnim, {
//             toValue: 1,
//             duration: this.props.duration || 500,
//             useNativeDriver: true,
//         }).start()
//     }
//
//     public render() {
//         const {style, children} = this.props;
//         return (
//             <React.Fragment>
//                 <Animated.View
//                     style={
//                         [
//                             style,
//                             {
//                                 opacity: this.opacityAnim,
//                                 transform: [{
//                                     translateY: this.opacityAnim.interpolate({
//                                         inputRange: [0, 1],
//                                         outputRange: [30, 0]  // 0 : 150, 0.5 : 75, 1 : 0
//                                     }),
//                                 }],
//                             }
//                         ]
//                     }
//                 >
//                     {children}
//                 </Animated.View>
//             </React.Fragment>
//         )
//     }
//
//     public _fadeInDown({calledBack}: {calledBack: ()=> void} = {} as any) {
//         Animated.timing(this.opacityAnim, {
//             toValue: 0,
//             duration: this.props.duration || 500,
//             useNativeDriver: true,
//         }).start(calledBack)
//     }
// }