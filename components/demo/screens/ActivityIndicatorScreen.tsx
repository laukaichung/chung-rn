import * as React from 'react'
import ActivityIndicator from "../../activity-indicator/ActivityIndicator";
import {NavigationProps} from "../demotype";
import UIContainer from "../../ui-provider/UIContainer";
import WhiteSpace from "../../white-space/WhiteSpace";


export class ActivityIndicatorScreen extends React.Component<NavigationProps> {
    public render() {
        return (
                <UIContainer>
                    <ActivityIndicator color="red" toast text={"Loading"}/>
                    <WhiteSpace/>
                    <ActivityIndicator color="red" text={"Loading"}/>
                </UIContainer>

        )
    }
}
