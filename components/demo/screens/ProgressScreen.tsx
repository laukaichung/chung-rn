import * as React from 'react'
import {View} from "react-native";
import {ScreenProps} from "../../type";
import Index from "../../progress";

interface Props extends ScreenProps {

}

export class ProgressScreen extends React.Component<Props> {
    render() {
        return (
            <View>
                <Index percentage={80} barColor="red" />
            </View>
        )
    }
}
