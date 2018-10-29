import * as React from 'react';
import {Animated, LayoutChangeEvent, StyleProp, StyleSheet, View, ViewStyle,} from 'react-native';
import Styles from "../style";
import ScreenUtil from "../util/ScreenUtil";

export interface ProgressProps {
    wrapWidth?: number;
    style?: StyleProp<ViewStyle>;
    barColor: string;
    percentage?: number;
    position?: 'fixed' | 'normal';
    unfilled?: boolean;
    appearTransition?: boolean;
}

interface ProgressState {
    percentage: Animated.Value;
    wrapWidth: number
}

export default class Progress extends React.Component<ProgressProps, ProgressState> {

    static defaultProps = {
        percentage: 0,
        position: 'normal',
        unfilled: true,
        appearTransition: false,
    } as ProgressProps;

    public constructor(props: ProgressProps) {
        super(props);
        this.state = {
            wrapWidth: props.wrapWidth || ScreenUtil.fullWidth(),
            percentage: new Animated.Value(0),
        };
    }

    public render() {
        const {position, unfilled, style, appearTransition, barColor = Styles.brandPrimary} = this.props;
        const {percentage} = this.state;
        const percentStyle = {width: appearTransition ? percentage : this._getWidth(), height: 0};
        const barStyles: any = [styles.progressBar, percentStyle, {borderColor: barColor}];
        const outerStyle: any = [
            styles.progressOuter,
            position === 'fixed' ? {position: 'absolute', top: 0} : null,
            !unfilled ? {backgroundColor: 'transparent'} : null,
            style,
        ];
        return (
            <View onLayout={this._onLayout} style={outerStyle}>
                {
                    appearTransition ?
                        <Animated.View style={barStyles}/> :
                        <View style={barStyles}/>
                }
            </View>
        );
    }

    public componentWillReceiveProps(nextProps: ProgressProps) {
        if (nextProps.wrapWidth !== this.props.wrapWidth) {
            this.setState({wrapWidth: nextProps.wrapWidth});
        }
        if (
            this.props.appearTransition &&
            nextProps.percentage !== this.props.percentage
        ) {
            this.setState({
                percentage: new Animated.Value(this._getWidth(nextProps.percentage)),
            });
        }
    }

    public componentDidMount() {

        if (this.props.appearTransition) {
            this.state.percentage.setValue(0);
            Animated.timing(this.state.percentage, {
                toValue: this._getWidth(),
                duration: 1000,
            }).start();
        }
    }

    private _onLayout = (e: LayoutChangeEvent) => {
        this.setState({
            wrapWidth: e.nativeEvent.layout.width,
        });
    };

    private _normalPercent = (percent?: number) => {
        let widthPercent: any = 0;
        if (percent !== undefined && percent > 0) {
            widthPercent = percent > 100 ? 100 : percent;
        }
        return widthPercent;
    };

    private _getWidth = (percent = this.props.percentage) => {
        return this.state.wrapWidth * (this._normalPercent(percent) / 100);
    }

}

const styles = StyleSheet.create(
    {
        progressOuter: {
            backgroundColor: Styles.borderColor,
            flex: 1,
        },
        progressBar: {
            borderBottomWidth: 10,
            borderStyle: 'solid',
        }
    }
);
