import * as React from 'react';
import {
    ActivityIndicator,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableHighlight,
    TouchableHighlightProps,
    View,
    ViewStyle,
} from 'react-native';
import Styles from "../style";
import {ThemeContext} from "../theme-provider/ThemeContext";
import CustomTouchableHighlight from "../custom-touchable-highlight";

export interface ButtonProps extends TouchableHighlightProps {
    activeStyle?: StyleProp<ViewStyle>;
    onPress?: (_?: any) => void;
    type?: 'primary' | 'warning' | 'ghost';
    size?: 'large' | 'small';
    disabled?: boolean;
    loading?: boolean;
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
            size = 'large',
            type = 'default',
            disabled,
            children,
            style,
            activeStyle,
            onPress,
            loading,
            ...restProps
        } = this.props;

        let {pressIn} = this.state;

        // textStyle = [
        //     buttonStyles[`${size}RawText`],
        //     disabled && buttonStyles[`${type}DisabledRawText`],
        //     this.state.pressIn && buttonStyles[`${type}HighlightText`],
        // ];

        // wrapperStyle = [
        //     buttonStyles.wrapperStyle,
        //     buttonStyles[`${size}Raw`],
        //     buttonStyles[`${type}Raw`],
        //     disabled && buttonStyles[`${type}DisabledRaw`],
        //     this.state.pressIn && activeStyle && buttonStyles[`${type}Highlight`],
        //     activeStyle && this.state.touchIt && activeStyle,
        //     style,
        // ];

        // const indicatorColor = (StyleSheet.flatten(
        //     this.state.pressIn
        //         ? buttonStyles[`${type}HighlightText`]
        //         : buttonStyles[`${type}RawText`],
        // ) as any).color;

        return (

            <ThemeContext.Consumer>
                {
                    ({isDarkMode}) => {

                        let textStyle:TextStyle[] = [
                            {fontSize: size === "small" ? Styles.buttonFontSizeSm : Styles.buttonFontSize}
                        ];

                        let indicatorColor:string;
                        let textColor:string;

                        let wrapperStyle: ViewStyle[] = [{
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: Styles.radiusMd,
                            borderWidth: 1,
                        }];

                        if (size === "large") {
                            wrapperStyle.push({
                                height: Styles.buttonHeight,
                                paddingVertical: Styles.paddingLg
                            })
                        } else {
                            wrapperStyle.push({
                                height: Styles.buttonHeightSm,
                                paddingVertical: Styles.paddingSm
                            })
                        }


                        if (type === "primary") {

                            wrapperStyle.push({
                                backgroundColor: isDarkMode?"#0d4480":Styles.primaryColorDark,
                                borderColor: Styles.primaryColorDark,
                            });
                            indicatorColor = textColor = isDarkMode?Styles.primaryColorLight:"#ffffff";

                            textStyle.push({
                                color: textColor
                            });

                            if(pressIn){

                                indicatorColor = textColor = `${Styles.InverseTextColor}4D`;

                                textStyle.push({
                                    color:textColor
                                });

                                if(activeStyle){
                                    wrapperStyle.push({
                                        backgroundColor: Styles.primaryColor,
                                        borderColor: Styles.primaryColor,
                                    });
                                }
                            }

                            if (disabled) {

                                wrapperStyle.push({
                                    backgroundColor: Styles.disabledBackgroundColor,
                                    borderColor: Styles.disabledBorderColor,
                                });

                                textStyle.push({
                                    color: Styles.InverseTextColor
                                })
                            }

                        } else if (type === "ghost") {

                            wrapperStyle.push({
                                backgroundColor: 'transparent',
                                borderColor: Styles.primaryColor,
                            });

                            textStyle.push({color: Styles.primaryColor});

                            indicatorColor = Styles.primaryColor;

                            if(pressIn) {

                                textStyle.push({
                                    color: `${Styles.InverseTextColor}4D`
                                });

                                indicatorColor = `${Styles.InverseTextColor}4D`

                                if (activeStyle) {

                                    wrapperStyle.push({
                                        backgroundColor: 'transparent',
                                        borderColor: Styles.primaryColor,
                                    })

                                }
                            }

                            if (disabled) {

                                wrapperStyle.push({
                                    borderColor: `${Styles.textBaseColor}1A`, // alpha 10%  https://codepen.io/chriscoyier/pen/XjbzAW
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
                                    color: Styles.textBaseColor
                                });

                                indicatorColor = Styles.textBaseColor;

                                if(activeStyle){
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
                                    {loading ? (
                                        <ActivityIndicator
                                            style={{marginRight: Styles.margin}}
                                            animating
                                            color={indicatorColor}
                                            size="small"
                                        />
                                    ) : null}
                                    <Text style={textStyle}>{children}</Text>
                                </View>
                            </CustomTouchableHighlight>
                        )
                    }
                }
            </ThemeContext.Consumer>
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
