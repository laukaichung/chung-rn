import * as React from 'react'
import {Text, View} from "react-native";
import {ScreenProps} from "../../type";

interface InputItemScreenProps extends ScreenProps {

}

export class TestScreen extends React.Component<InputItemScreenProps> {
    render() {
        return (
            <View>
                <Text>Test Screen</Text>
            </View>
        )
    }
}
