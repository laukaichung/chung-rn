import * as React from 'react'
import {ScreenProps} from "../../type";
import {View} from 'react-native'
import ActivityIndicator from "../../activity-indicator";

interface ActivityIndicatorScreenProps extends ScreenProps {

}

export class ActivityIndicatorScreen extends React.Component<ActivityIndicatorScreenProps> {
    public render() {
        return (
                <View style={{flex:1,justifyContent: "center"}}>
                    <ActivityIndicator color="red" toast text={"Loading"}/>
                    <ActivityIndicator color="red" text={"Loading"}/>
                </View>

        )
    }
}
