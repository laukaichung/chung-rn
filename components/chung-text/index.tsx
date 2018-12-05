import * as React from 'react'
import {Text, TextProps} from "react-native";
import Styles from "../style";

interface ChungTextProps extends TextProps{
    children:any
}

export const ChungText = (props: ChungTextProps) => {
    return (
        <Text {...props} style={[props.style, {lineHeight: 24}, {color: Styles.textColor}]}/>
    )
};

export default ChungText;
