import * as React from 'react'
import ActivityIndicator from "../../ActivityIndicator";
import {NavigationProps} from "../demotype";
import UIMainContainer from "../../UIMainContainer";
import WhiteSpace from "../../WhiteSpace";


export class ActivityIndicatorScreen extends React.Component<NavigationProps> {
    public render() {
        return (
                <UIMainContainer>
                    <ActivityIndicator color="red" toast text={"Loading"}/>
                    <WhiteSpace/>
                    <ActivityIndicator color="red" text={"Loading"}/>
                </UIMainContainer>

        )
    }
}
