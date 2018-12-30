import * as React from 'react'
import {Text, TextProps} from "react-native";
import Styles from "../styles/Styles";

interface ChungTextProps extends TextProps {
    children: any
}

export const ChungText = (props: ChungTextProps) => {
    return <Text {...props} style={[{color:Styles.textColor},props.style, {lineHeight: 24}]}/>

};

export default ChungText;
