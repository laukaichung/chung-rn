import * as React from 'react'
import {Text, TextProps} from "react-native";

export default class ChungText extends React.Component<TextProps>{
    render(){
        let {props} = this;
        return (
            <Text {...props} style={{lineHeight: 24}}/>
        )
    }
}