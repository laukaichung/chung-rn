import * as React from 'react'
import {View, ViewProps} from "react-native";


class ChungView extends React.Component<ViewProps>{
    render(){
        let {props} = this;
        return (
            <View {...props}/>
        )
    }
}
