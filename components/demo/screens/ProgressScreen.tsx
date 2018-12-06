import * as React from 'react'
import {NavigationProps} from "../demotype";
import Index from "../../progress";
import UIContainer from "../../ui-provider/UIContainer";


export class ProgressScreen extends React.Component<NavigationProps> {
    render() {
        return (
            <UIContainer>
                <Index percentage={80} barColor="red" />
                <Index percentage={60} barColor="red" />
            </UIContainer>
        )
    }
}
