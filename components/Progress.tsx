import * as React from 'react';
import {
    Animated, Easing,
    Platform,
    ProgressBarAndroid,
    ProgressViewIOS,
    StyleProp,
    ViewStyle,
} from 'react-native';

export interface ProgressProps {
    style?: StyleProp<ViewStyle>;
    barColor: string;
    percentage?: number;
}

interface ProgressState {
    percentage: number
}

const AnimatedProgressAndroid = Animated.createAnimatedComponent(ProgressBarAndroid);
const AnimatedProgressIOS = Animated.createAnimatedComponent(ProgressViewIOS);

export default class Progress extends React.Component<ProgressProps, ProgressState> {
    public state: ProgressState = {percentage: this.props.percentage / 100};
    private percentageAnimation = new Animated.Value(0);

    public render() {
        //const {percentage} = this.state;
        const {barColor = "green"} = this.props;
        return Platform.OS === "ios" ?
            <AnimatedProgressIOS
                progressTintColor={barColor}
                progress={this.percentageAnimation}
            /> :
            <AnimatedProgressAndroid
                color={barColor}
                styleAttr="Horizontal"
                indeterminate={false}
                progress={this.percentageAnimation}
            />
    }

    componentDidMount(){
        Animated.timing(this.percentageAnimation,{
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.ease,
            toValue: this.state.percentage,
        }).start()
    }

}
