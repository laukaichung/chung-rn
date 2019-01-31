import * as React from 'react'
import {Text, TextProps} from "react-native";
import Styles from "./Styles";

interface ChungTextProps extends TextProps {
    children: any
}

export const ChungText = ({style = {}, ...restProps}: ChungTextProps) => {
    return <Text {...restProps} style={Object.assign({},Styles.textBaseStyle, style)}/>

};

export default ChungText;
