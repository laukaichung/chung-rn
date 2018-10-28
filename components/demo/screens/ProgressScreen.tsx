import * as React from 'react'
import {View} from "react-native";
import {RNScreenProps} from "../demotype";
import Index from "../../progress";

interface Props extends RNScreenProps {

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
