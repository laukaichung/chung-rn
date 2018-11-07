import * as React from 'react'
import {Text, TextProps, View, Image, ViewProps, ImageProps} from 'react-native'

class ChungText extends React.Component<TextProps>{
    render(){
        let {props} = this;
        return (
            <Text {...props} style={{lineHeight: 24}}/>
        )
    }
}

class ChungView extends React.Component<ViewProps>{
    render(){
        let {props} = this;
        return (
            <View {...props}/>
        )
    }
}

class ChungImage extends React.Component<ImageProps>{
    render(){
        let {props} = this;
        return (
            <Image {...props}/>
        )
    }
}

export default class Theme extends React.Component{
    static Image = ChungImage;
    static View = ChungView;
    static Text = ChungText;
}
