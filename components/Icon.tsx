import * as React from 'react'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {StyleProp, TouchableOpacity} from "react-native";
import Styles from "./Styles";

export type IconSize = "sm" | "md" | "lg" | "xl"

export interface IconProps {
    color?: string;
    backgroundColor?: string;
    onPress?: (e?: any) => void;
    style?: StyleProp<any>
    name: string;
    size?: IconSize
    customSize?: number;
}

const Icon = (props: IconProps) => {
    const {size, customSize, onPress} = props;
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
    if (onPress) {
        return (
            <TouchableOpacity onPress={onPress}>
                {iconComponent}
            </TouchableOpacity>
        )
    }

    return iconComponent
};

export class StatefulIcon extends React.Component<IconProps>{
    public render(){
        return (
            <Icon {...this.props}/>
        )
    }
}


export default Icon;


