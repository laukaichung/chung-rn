import * as React from 'react'
import Styles from "../styles/Styles";
import {IconProps} from "./Icon";
import Icon from 'react-native-vector-icons/FontAwesome';

export interface IconButtonProps extends IconProps {
    text?: string
    onPress: () => void;
    disabled?: boolean;
}

export const IconButton = (props: IconButtonProps) => {
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


export default IconButton
