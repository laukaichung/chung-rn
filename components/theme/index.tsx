import * as React from 'react'
import {Text, TextProps, View, Image, ViewProps, ImageProps} from 'react-native'

interface ThemeProps {}

const ChungText = (props: TextProps) => <Text {...props} style={{lineHeight: 24}}/>

const ChungView = (props: ViewProps) => <View {...props}/>

const ChungImage = (props:ImageProps) => <Image {...props}/>

export default class Theme extends React.Component<ThemeProps> {
    static Text = ChungText;
    static View = ChungView;
    static Image = ChungImage;
}
