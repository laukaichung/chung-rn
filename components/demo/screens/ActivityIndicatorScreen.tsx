import * as React from 'react'
import {RNScreenProps} from "../demotype";
import {View} from 'react-native'
import ActivityIndicator from "../../activity-indicator";

interface ActivityIndicatorScreenProps extends RNScreenProps {

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
