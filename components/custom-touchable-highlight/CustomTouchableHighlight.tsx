import * as React from 'react'
import {TouchableHighlight, TouchableHighlightProps} from "react-native";
import Styles from "../styles/Styles";

export const CustomTouchableHighlight = (props: TouchableHighlightProps) => {
    return (
        <TouchableHighlight underlayColor={Styles.selectedBackgroundColor} {...props} onPress={props.onPress}/>
    )
};

export default CustomTouchableHighlight
