import * as React from 'react'
import {NavigationProps} from "../demotype";
import UIMainContainer from "../../UIMainContainer";
import Progress from "../../Progress";
import {View} from "react-native";
import WingBlank from "../../WingBlank";


export class ProgressScreen extends React.Component<NavigationProps> {
    render() {
        return (
            <UIMainContainer>
                <WingBlank marginVertical
                >
                    <Progress percentage={60} barColor={"red"}/>
                </WingBlank>
            </UIMainContainer>
        )
    }
}
