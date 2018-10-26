import * as React from 'react'
import {ScreenProps} from "../../type";
import {View,Text} from 'react-native'
import Index from "../../grid";
import Index from "../../activity-indicator";

interface ActivityIndicatorScreenProps extends ScreenProps {

}

export class ActivityIndicatorScreen extends React.Component<ActivityIndicatorScreenProps> {
    render() {
        return (
            <View>
                <Index/>
            </View>
        )
    }
}
