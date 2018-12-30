import * as React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleProp, TouchableOpacity} from "react-native";
import Styles from "../styles/Styles";

export interface CustomIconProps {
    color?: string;
    backgroundColor?: string;
    onPress?: (e?: any) => void;
    style?: StyleProp<any>
    name: string;
    size?: "sm" | "md" | "lg" | "xl"
    customSize?: number;
}

export const CustomIcon = (props: CustomIconProps) => {
    let {size, customSize, onPress} = props;
    let sizeNo =
        customSize ? customSize :
            size === "sm" ? Styles.iconSizeSm :
                size === "lg" ? Styles.iconSizeLg :
                    size === "xl" ? 60 : Styles.iconSizeMd;
    let {color} = props;
    if (Styles.isDarkMode && !color) color = '#c6c6c6';
    let iconComponent = <Icon {...props}
                              color={color}
                              size={sizeNo}/>;
    if (onPress) {

        return (
            <TouchableOpacity onPress={props.onPress}>
                {iconComponent}
            </TouchableOpacity>
        )

    }

    return iconComponent
};


export interface CustomIconButtonProps extends CustomIconProps {
    text?: string
    onPress: () => void;
    disabled?: boolean;
}

export const CustomIconButton = (props: CustomIconButtonProps) => {
    let {onPress, text} = props;
    return (
        <Icon.Button {...props}
                     backgroundColor={props.backgroundColor || Styles.isDarkMode ? Styles.darkestColor : "#eeeeee"}
                     color={props.color || Styles.iconColor}
                     onPress={onPress}>
            {text}
        </Icon.Button>
    )
};
