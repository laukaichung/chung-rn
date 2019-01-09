import * as React from 'react';
import {Platform, ProgressBarAndroid, ProgressViewIOS, StyleProp, ViewStyle,} from 'react-native';

export interface ProgressProps {
    style?: StyleProp<ViewStyle>;
    barColor: string;
    percentage?: number;
}

interface ProgressState {
    percentage: number
}

export default class Progress extends React.Component<ProgressProps, ProgressState> {
    public state:ProgressState = {percentage:this.props.percentage/100};
    public render() {

        const {percentage} = this.state;
        console.log(percentage);
        const {barColor = "green"} = this.props;
        return Platform.OS === "ios"?

                <ProgressViewIOS progressTintColor={barColor} progress={percentage}/>:

                <ProgressBarAndroid
                    color={barColor}
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={percentage}
                />

    }

}
