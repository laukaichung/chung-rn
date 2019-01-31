import * as React from 'react'
import {Text, TextProps, StyleSheet} from "react-native";
import Styles from "./Styles";

interface ChungTextProps extends TextProps {
    children: any
}

export const ChungText = ({style = {}, ...restProps}: ChungTextProps) => {
    // let newStyle = null;
    // if(Array.isArray(style)){
    //     newStyle = [Styles.textBaseStyle].concat(style as any)
    // }else{
    //     newStyle = Object.assign({},Styles.textBaseStyle,style)
    // }

    return <Text {...restProps} style={
        [
            {
                fontFamily: Styles.fontFamily,
                color: Styles.textColor,
                lineHeight: Styles.lineHeight
            },
            StyleSheet.flatten(style)
        ]
    }
    />

};

export default ChungText;
