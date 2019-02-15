import * as React from 'react';
import {
    ActivityIndicator,
    Animated,
    StyleProp,
    TextStyle,
    TouchableHighlightProps,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import Styles from "./Styles";
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
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default class Button extends React.Component<ButtonProps, State> {

    public constructor(props: ButtonProps) {
        super(props);
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
            borderBottomWidth: 2,
            borderBottomColor: "grey",
            // elevation:2,
            // shadowOffset: { width: 1, height: 2 },
            // shadowColor: "grey",
            // shadowOpacity: 0.5,
            // shadowRadius: Styles.radiusMd,
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
            <AnimatedTouchable
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
                            <ChungText style={textStyle}><Icon size={iconSize || "sm"} name={icon}/> {children}
                            </ChungText>
                            :
                            <ChungText style={textStyle}>{children}</ChungText>
                    }
                </View>
            </AnimatedTouchable>
        )
    }
}
