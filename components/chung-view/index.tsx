import * as React from 'react'
import {View, ViewProps} from "react-native";
import Styles from "../style";
import {ReactNode} from "react";

interface ChungViewProps extends ViewProps{
    children:ReactNode
}

const ChungView = (props:ChungViewProps)=>{
    return (
        <View {...props}/>
    )
};

// const ChungView = (props:ViewProps):ReactNode=>{
//     return (
//         <View {...props}/>
//     )
// };
//

export default ChungView;


