import * as React from 'react'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {StyleProp, TouchableOpacity} from "react-native";
import Styles from "./Styles";

export interface IconProps {
    color?: string;
    backgroundColor?: string;
    onPress?: (e?: any) => void;
    style?: StyleProp<any>
    name: string;
    size?: "sm" | "md" | "lg" | "xl"
    customSize?: number;
}

const Icon = (props: IconProps) => {
    let {size, customSize, onPress} = props;
    let sizeNo =
        customSize ? customSize :
            size === "sm" ? Styles.iconSizeSm :
                size === "lg" ? Styles.iconSizeLg :
                    size === "xl" ? 60 : Styles.iconSizeMd;
    let {color} = props;
    if (Styles.isDarkMode && !color) color = '#c6c6c6';
    let iconComponent = <FontAwesomeIcon {...props}
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

export default Icon;



