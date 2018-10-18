import * as React from 'react'
import {TouchableHighlight, TouchableHighlightProps} from "react-native";
import {Styles} from "../style/Styles";

export const CustomTouchableHighlight = (props: TouchableHighlightProps) => {
    return (
        <TouchableHighlight underlayColor={Styles.selectedColor} {...props}/>
    )
};
