import * as React from 'react';
import {ActivityIndicator, StyleProp, TextStyle, TouchableHighlightProps, View, ViewStyle,} from 'react-native';
import Styles from "./Styles";
import CustomTouchableHighlight from "./CustomTouchableHighlight";
import Icon, {IconSize} from "./Icon";
import ChungText from "./ChungText";

export interface ButtonProps extends TouchableHighlightProps {
    activeStyle?: StyleProp<ViewStyle>;
    onPress?: (_?: any) => void;
    type?: 'primary';
    size?: 'lg' | 'md';
    disabled?: boolean;
    loading?: boolean;
    icon?: string;
    iconSize?: IconSize
}

interface State {
    pressIn: boolean,
    touchIt: boolean
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
            size = 'md',
            type = 'default',
            disabled,
            children,
            style,
            icon,
            iconSize,
            activeStyle,
            onPress,
            loading,
            ...restProps
        } = this.props;

        let {pressIn} = this.state;

        let textStyle: TextStyle[] = [
            {fontSize: size === "lg" ? Styles.buttonFontSizeLg : Styles.buttonFontSize}
        ];

        let indicatorColor: string;
        let textColor: string;

        let wrapperStyle: ViewStyle[] = [{
            alignItems: 'center',
            justifyContent: 'center',
            padding: size === "lg" ? Styles.padding : Styles.paddingSm,
            borderWidth: 1,
            borderRadius: Styles.radiusMd,
            elevation:4,
            shadowOffset: { width: 1, height: 2 },
            shadowColor: "grey",
            shadowOpacity: 0.5,
            shadowRadius: Styles.radiusMd,
        }];

        if (type === "primary") {

            wrapperStyle.push({
                backgroundColor: Styles.primaryButtonBackgroundColor,
                borderColor: Styles.borderColor,
            });

            textColor = Styles.primaryButtonTextColor;

            indicatorColor = Styles.indicatorColor;

            textStyle.push({
                color: textColor
            });

            if (pressIn) {

                indicatorColor = textColor = `${Styles.whiteTextColor}4D`;

                textStyle.push({
                    color: textColor
                });

                if (activeStyle) {
                    wrapperStyle.push({
                        backgroundColor: Styles.primaryColor,
                        borderColor: Styles.primaryColor,
                    });
                }
            }

            if (disabled) {

                wrapperStyle.push({
                    borderColor: Styles.disabledBorderColor,
                });

                textStyle.push({
                    color: Styles.disabledTextColor
                })
            }

        } else if (type === "default") {


            textStyle.push({
                color: Styles.textColor,
            });

            indicatorColor = Styles.textColor;

            wrapperStyle.push({
                backgroundColor: Styles.backgroundColor,
                borderColor: Styles.borderColor,
            });

            if (pressIn) {

                textStyle.push({
                    color: Styles.defaultButtonPressInTextColor
                });

                indicatorColor = Styles.defaultButtonPressInTextColor;

                if (activeStyle) {
                    wrapperStyle.push({
                        backgroundColor: Styles.backgroundColor,
                        borderColor: Styles.borderColor,
                    });
                }
            }

            if (disabled) {

                wrapperStyle.push({
                    backgroundColor: Styles.disabledBackgroundColor,
                    borderColor: Styles.disabledBorderColor,
                });

                textStyle.push({
                    color: Styles.disabledTextColor
                })
            }
        }

        wrapperStyle.push(style as any);

        return (
            <CustomTouchableHighlight
                {...restProps}
                style={wrapperStyle}
                disabled={disabled}
                activeOpacity={1}
                onPress={(e?: any) => onPress && onPress(e)}
                onPressIn={this._onPressIn}
                onPressOut={this._onPressOut}
                onShowUnderlay={this._onShowUnderlay}
                onHideUnderlay={this._onHideUnderlay}
            >
                <View style={{flexDirection: 'row'}}>
                    {
                        loading ? (
                            <ActivityIndicator
                                style={{marginRight: Styles.margin}}
                                animating
                                color={indicatorColor}
                                size="small"
                            />
                        ) : null}
                    {
                        icon ?
                            <ChungText style={textStyle}><Icon size={iconSize || "sm"} name={icon}/> {children}</ChungText>
                            :
                            <ChungText style={textStyle}>{children}</ChungText>
                    }
                </View>
            </CustomTouchableHighlight>
        )

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
