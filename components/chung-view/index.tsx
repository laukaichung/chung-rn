import * as React from 'react'
import {ReactNode} from 'react'
import {View, ViewProps} from "react-native";

interface ChungViewProps extends ViewProps{
    children:ReactNode
}

const ChungView = (props:ChungViewProps)=>{
    return (
        <View {...props}/>
    )
};

export default ChungView;


