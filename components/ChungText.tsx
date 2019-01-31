import * as React from 'react'
import {Text, TextProps} from "react-native";
import Styles from "./Styles";

interface ChungTextProps extends TextProps {
    children: any
}

export const ChungText = (props: ChungTextProps) => {
    return <Text {...props} style={[Styles.textBaseStyle, {fontFamily: Styles.fontFamily}, props.style]}/>

};

export default ChungText;
