import * as React from 'react';
import {
    Animated, Easing,
    Platform,
    ProgressBarAndroid,
    ProgressViewIOS,
    StyleProp,
    ViewStyle,
} from 'react-native';
import {TestProps} from "./type";
import {useEffect, useState} from "react";

export interface ProgressProps extends TestProps {
    style?: StyleProp<ViewStyle>;
    barColor: string;
    percentage?: number;
}

const AnimatedProgressAndroid = Animated.createAnimatedComponent(ProgressBarAndroid);
const AnimatedProgressIOS = Animated.createAnimatedComponent(ProgressViewIOS);

const Progress = ({barColor = "green", percentage: initialPercentage, testID}: ProgressProps) => {
    const percentageAnimation = new Animated.Value(0);
    const [percentage] = useState(initialPercentage / 100);
    useEffect(() => {
        Animated.timing(percentageAnimation, {
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.ease,
            toValue: percentage,
        }).start()
    });
    return Platform.OS === "ios" ?
        <AnimatedProgressIOS
            testID={testID}
            progressTintColor={barColor}
            progress={percentageAnimation}
        /> :
        <AnimatedProgressAndroid
            testID={testID}
            color={barColor}
            styleAttr="Horizontal"
            indeterminate={false}
            progress={percentageAnimation}
        />
};

export default Progress;
