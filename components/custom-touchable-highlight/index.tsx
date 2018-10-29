import * as React from 'react'
import {TouchableHighlight, TouchableHighlightProps} from "react-native";
import Styles from "../style";

export const CustomTouchableHighlight = (props: TouchableHighlightProps) => {
    return (
        <TouchableHighlight underlayColor={Styles.selectedColor} {...props}/>
    )
};
