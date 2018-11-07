import * as React from 'react'
import {View, ViewProps} from "react-native";

export default class ChungView extends React.Component<ViewProps>{
    render(){
        let {props} = this;
        return (
            <View {...props}/>
        )
    }
}

// const ChungView = (props:ViewProps):ReactNode=>{
//     return (
//         <View {...props}/>
//     )
// };
//
// export default ChungView;
