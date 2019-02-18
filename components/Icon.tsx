import * as React from 'react'
import Styles from "./Styles";
import ConfirmModal, {ConfirmModalProps} from "./ConfirmModal";
import {StyleProp, TextStyle, TouchableOpacity} from "react-native";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from "react-native-animatable";

export type IconSize = "sm" | "md" | "lg" | "xl"

export interface IconProps{
    color?: string;
    backgroundColor?: string;
    onPress?: (e?: any) => void;
    style?: StyleProp<TextStyle>
    name: string;
    size?: IconSize
    customSize?: number;
    onConfirmProps?: ConfirmModalProps;
}

export default class Icon extends React.Component<IconProps> {

    public static Animated = Animatable.createAnimatableComponent(Icon);

    public render() {
        const {props} = this;
        const {size, customSize, onConfirmProps, onPress} = props;
        let {color} = props;
        let sizeNo =
            customSize ? customSize :
                size === "sm" ? Styles.iconSizeSm :
                    size === "lg" ? Styles.iconSizeLg :
                        size === "xl" ? 60 : Styles.iconSizeMd;
        if (Styles.isDarkMode && !color) color = '#c6c6c6';
        let iconComponent = (
            <FontAwesomeIcon
                {...props}
                color={color}
                size={sizeNo}
            />
        );

        if (onConfirmProps) {

            return (
                <ConfirmModal
                    {...onConfirmProps}
                    buttonTrigger={(
                        iconComponent
                    )}
                />
            )

        } else if (onPress) {
            return (
                <TouchableOpacity onPress={onPress}>
                    {iconComponent}
                </TouchableOpacity>
            )
        }

        return iconComponent
    }
}

