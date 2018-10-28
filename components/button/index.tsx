import * as React from 'react';
import {ActivityIndicator, StyleProp, StyleSheet, Text, TouchableHighlightProps, View, ViewStyle,} from 'react-native';
import buttonStyle from './buttonStyles';
import {CustomTouchableHighlight} from "../misc/CustomTouchableHighlight";

export interface ButtonProps extends TouchableHighlightProps {
    activeStyle?: StyleProp<ViewStyle>;
    onClick?: (_?: any) => void;
    type?: 'primary' | 'warning' | 'ghost';
    size?: 'large' | 'small';
    disabled?: boolean;
    loading?: boolean;
}

const buttonStyles = StyleSheet.create<any>(buttonStyle);

interface State {
    pressIn:boolean,
    touchIt:boolean
}

export default class Button extends React.Component<ButtonProps, State> {

    public constructor(props: ButtonProps) {
        super(props);
        this.state = {
            pressIn: false,
            touchIt: false,
        };
    }

    public render() {
        const {
            size = 'large',
            type = 'default',
            disabled,
            activeStyle,
            onClick,
            style,
            loading,
            ...restProps
        } = this.props;

        const textStyle = [
            buttonStyles[`${size}RawText`],
            buttonStyles[`${type}RawText`],
            disabled && buttonStyles[`${type}DisabledRawText`],
            this.state.pressIn && buttonStyles[`${type}HighlightText`],
        ];

        const wrapperStyle = [
            buttonStyles.wrapperStyle,
            buttonStyles[`${size}Raw`],
            buttonStyles[`${type}Raw`],
            disabled && buttonStyles[`${type}DisabledRaw`],
            this.state.pressIn && activeStyle && buttonStyles[`${type}Highlight`],
            activeStyle && this.state.touchIt && activeStyle,
            style,
        ];

        const indicatorColor = (StyleSheet.flatten(
            this.state.pressIn
                ? buttonStyles[`${type}HighlightText`]
                : buttonStyles[`${type}RawText`],
        ) as any).color;

        return (
            <CustomTouchableHighlight
                {...restProps}
                style={wrapperStyle}
                disabled={disabled}
                activeOpacity={1}
                onPress={(e?: any) => onClick && onClick(e)}
                onPressIn={this._onPressIn}
                onPressOut={this._onPressOut}
                onShowUnderlay={this._onShowUnderlay}
                onHideUnderlay={this._onHideUnderlay}
            >
                <View style={buttonStyles.container}>
                    {loading ? (
                        <ActivityIndicator
                            style={buttonStyles.indicator}
                            animating
                            color={indicatorColor}
                            size="small"
                        />
                    ) : null}
                    <Text style={textStyle}>{this.props.children}</Text>
                </View>
            </CustomTouchableHighlight>
        );
    }

    private _onPressIn = (...arg: any[]) => {
        this.setState({pressIn: true});
        if (this.props.onPressIn) {
            (this.props.onPressIn as any)(...arg);
        }
    };

    private _onPressOut = (...arg: any[]) => {
        this.setState({pressIn: false});
        if (this.props.onPressOut) {
            (this.props.onPressOut as any)(...arg);
        }
    };

    private _onShowUnderlay = (...arg: any[]) => {
        this.setState({touchIt: true});
        if (this.props.onShowUnderlay) {
            (this.props.onShowUnderlay as any)(...arg);
        }
    };

    private _onHideUnderlay = (...arg: any[]) => {
        this.setState({touchIt: false});
        if (this.props.onHideUnderlay) {
            (this.props.onHideUnderlay as any)(...arg);
        }
    };

}
