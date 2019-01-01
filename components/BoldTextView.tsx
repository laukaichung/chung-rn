import * as React from 'react'
import ChungText from "./ChungText";
import {StyleProp, TextStyle} from "react-native";
import {ChungStyles} from "./index";

interface BoldTextProps{
    children:any;
    color?:string
    fontSize?:number;
    style?:StyleProp<TextStyle>
}

const BoldTextView = (({children,style,fontSize,color}:BoldTextProps)=>{
    return (
        <ChungText style={[{fontSize,fontWeight:'bold',color:color || ChungStyles.textColor},style]}>{children}</ChungText>
    )
});

export default BoldTextView
