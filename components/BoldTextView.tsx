import * as React from 'react'
import ChungText from "./ChungText";
import {StyleProp, TextStyle} from "react-native";

interface BoldTextProps{
    children:any;
    fontSize?:number;
    style?:StyleProp<TextStyle>
}

const BoldTextView = (({children,style,fontSize}:BoldTextProps)=>{
    return (
        <ChungText style={[{fontSize,fontWeight:'bold'},style]}>{children}</ChungText>
    )
});

export default BoldTextView
