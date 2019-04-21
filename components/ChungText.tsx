import * as React from 'react'
import {Text, TextProps} from "react-native";
import Styles from "./Styles";

interface ChungTextProps extends TextProps {
    children: any
}


export const ChungText = ({style = {}, ...restProps}: ChungTextProps) => {
    const textBasedStyle = {
        fontFamily: Styles.fontFamily,
        color: Styles.fontColor,
    };
    return <Text {...restProps} style={[textBasedStyle,style]}/>
};

export default ChungText;
