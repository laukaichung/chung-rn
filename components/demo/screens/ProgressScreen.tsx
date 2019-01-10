import * as React from 'react'
import {NavigationProps} from "../demotype";
import UIContainer from "../../UIContainer";
import Progress from "../../Progress";


export class ProgressScreen extends React.Component<NavigationProps> {
    render() {
        return (
            <UIContainer>
                <Progress percentage={60} barColor={"red"}/>
            </UIContainer>
        )
    }
}
