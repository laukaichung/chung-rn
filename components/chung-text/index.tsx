import * as React from 'react'
import {Text, TextProps} from "react-native";
import Styles from "../style";

export const ChungText = (props: TextProps) => {
    return (
        <Text {...props} style={[props.style, {lineHeight: 24}, {color: Styles.textColor}]}/>
    )
};

export default ChungText;
