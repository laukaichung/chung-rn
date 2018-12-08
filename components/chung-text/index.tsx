import * as React from 'react'
import {Text, TextProps} from "react-native";
import {ChungStyles} from "../index";

interface ChungTextProps extends TextProps {
    children: any
}

export const ChungText = (props: ChungTextProps) => {
    return <Text {...props} style={[{color:ChungStyles.textColor},props.style, {lineHeight: 24}]}/>

};

export default ChungText;
