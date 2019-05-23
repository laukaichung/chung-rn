import * as React from 'react';
import {
    ActivityIndicator,
    StyleProp,
    TextStyle,
    TouchableHighlightProps,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import Styles from "./Styles";
import ChungText from "./ChungText";
import WingBlank from "./WingBlank";
import {ReactNode} from "react";
import * as Animatable from "react-native-animatable";
import {TestProps} from "./type";

export interface ButtonProps extends TouchableHighlightProps, TestProps {
    activeStyle?: StyleProp<ViewStyle>;
    onPress?: (_?: any) => void;
    type?: 'primary';
    size?: 'lg' | 'md';
    disabled?: boolean;
    loading?: boolean;
    icon?: ReactNode;
}

interface State {

}

export default class Button extends React.Component<ButtonProps, State> {

    public static Animated = Animatable.createAnimatableComponent(Button);

    public render() {
        const {
            size = 'md',
            type = 'default',
            disabled,
            children,
            style,
            activeStyle,
            onPress,
            icon,
            loading,
            ...restProps
        } = this.props;

        const buttonFontSize = size === "lg" ? Styles.buttonFontSizeLg : Styles.buttonFontSize

        let textStyle: TextStyle[] = [
            {
                fontSize: buttonFontSize,
            }
        ];


        let indicatorColor: string;
        let textColor: string;

        let wrapperStyle: ViewStyle[] = [{
            alignItems: 'center',
            justifyContent: 'center',
            padding: size === "lg" ? Styles.paddingLg : Styles.padding,
            borderWidth: 1,
            borderColor: "#d0d0d0",
            borderRadius: Styles.radiusMd,
            borderBottomWidth: 2,
            borderBottomColor: "#cfcfcf",
            // elevation:2,
            // shadowOffset: { width: 1, height: 2 },
            // shadowColor: "grey",
            // shadowOpacity: 0.5,
            // shadowRadius: Styles.radiusMd,
        }];

        const disableButtonStyle = disabled && {
            backgroundColor: Styles.disabledBackgroundColor,
            borderColor: Styles.disabledBorderColor,
            borderBottomColor: Styles.disabledBorderColor,
        };

        if (type === "primary") {

            wrapperStyle.push({
                backgroundColor: Styles.primaryButtonBackgroundColor,
                borderColor: "#1195ee",
                borderBottomColor: "#1072bd",
            });

            textColor = Styles.primaryButtonTextColor;

            indicatorColor = Styles.indicatorColor;

            textStyle.push({
                color: textColor
            });

            if (disabled) {

                wrapperStyle.push(disableButtonStyle);

                textStyle.push({
                    color: Styles.disabledTextColor
                })
            }

        } else if (type === "default") {


            textStyle.push({
                color: Styles.fontColor,
            });

            indicatorColor = Styles.fontColor;

            wrapperStyle.push({
                backgroundColor: Styles.backgroundColor,
                borderColor: Styles.borderColor,
                borderBottomColor: Styles.disabledBorderColor,
            });

            if (disabled) {

                wrapperStyle.push(disableButtonStyle);

                textStyle.push({
                    color: Styles.disabledTextColor
                })
            }
        }

        wrapperStyle.push(style as any);

        return (
            <TouchableOpacity
                {...restProps}
                style={wrapperStyle}
                disabled={disabled}
                onPress={(e?: any) => {
                    if (onPress) {
                        onPress(e)
                    }
                }}
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
                            <View style={{flexDirection: "row"}}>
                                {icon}
                                <WingBlank>
                                    <ChungText style={[textStyle]}>
                                        {children}
                                    </ChungText>
                                </WingBlank>
                            </View>
                            :
                            <ChungText style={textStyle}>
                                {children}
                            </ChungText>
                    }
                </View>
            </TouchableOpacity>
        )
    }
}
