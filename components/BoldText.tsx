import * as React from 'react'
import ChungText from "./ChungText";
import {StyleProp, TextProps, TextStyle} from "react-native";
import {ChungStyles} from "./index";
import {ReactNode} from "react";

interface BoldTextProps extends TextProps{
    color?:string
    center?:boolean;
    fontSize?:number;
    style?:StyleProp<TextStyle>
    children: ReactNode;
}

const BoldText = (({style,center,fontSize,color,...textProps}:BoldTextProps)=>{
    return (
        <ChungText
            style={[{fontSize,fontWeight:'bold',color:color || ChungStyles.fontColor},center?{textAlign:"center"}:null,style]}
            {...textProps}
        />
    )
});

export default BoldText
