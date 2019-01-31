import * as React from 'react'
import {Text, TextProps} from "react-native";
import Styles from "./Styles";

interface ChungTextProps extends TextProps {
    children: any
}

export const ChungText = ({style = {}, ...restProps}: ChungTextProps) => {
    let newStyle = null;
    if(Array.isArray(style)){
        newStyle = [Styles.textBaseStyle].concat(style as any)
    }else{
        newStyle = Object.assign({},Styles.textBaseStyle,style)
    }

    return <Text {...restProps} style={newStyle}/>

};

export default ChungText;
