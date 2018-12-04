import * as React from 'react'
import {View, ViewProps} from "react-native";
import Styles from "../style";

const ChungView = (props:ViewProps)=>{
    return (
        <View {...props} style={[{backgroundColor:Styles.backgroundColor},props.style]}/>
    )
};

// const ChungView = (props:ViewProps):ReactNode=>{
//     return (
//         <View {...props}/>
//     )
// };
//

export default ChungView;


