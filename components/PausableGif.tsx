import * as React from 'react'
import {ReactNode} from 'react'
import {Image, ImageSourcePropType, StyleProp, TouchableHighlight, ViewStyle} from "react-native";
import {TestProps} from "./type";

interface PausableGifProps extends TestProps{
    source: ImageSourcePropType;
    pauseIcon:ReactNode
    style?:StyleProp<ViewStyle>
}

interface PausableState {
    play: boolean
}

export default class PausableGif extends React.Component<PausableGifProps, PausableState> {

    public state: PausableState = {play: false};

    public render() {
        const {play} = this.state;
        const {pauseIcon, style, source, testID} = this.props;
        return (
            <TouchableHighlight
                testID={testID}
                style={style}
                onPress={() => this.setState({play: !play})}
            >
                <React.Fragment>
                    {
                        play ? <Image source={source}/> : pauseIcon
                    }
                </React.Fragment>
            </TouchableHighlight>
        )
    }
}

