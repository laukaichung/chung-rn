import * as React from 'react'
import {View} from 'react-native'
import ActivityIndicator from "../../activity-indicator";
import {NavigationProps} from "../demotype";
import ThemeContainer from "../../theme-provider/ThemeContainer";
import WhiteSpace from "../../white-space";


export class ActivityIndicatorScreen extends React.Component<NavigationProps> {
    public render() {
        return (
                <ThemeContainer>
                    <ActivityIndicator color="red" toast text={"Loading"}/>
                    <WhiteSpace/>
                    <ActivityIndicator color="red" text={"Loading"}/>
                </ThemeContainer>

        )
    }
}
