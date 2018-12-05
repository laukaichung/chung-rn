import * as React from 'react'
import {NavigationProps} from "../demotype";
import Index from "../../progress";
import ThemeContainer from "../../theme-provider/ThemeContainer";


export class ProgressScreen extends React.Component<NavigationProps> {
    render() {
        return (
            <ThemeContainer>
                <Index percentage={80} barColor="red" />
                <Index percentage={60} barColor="red" />
            </ThemeContainer>
        )
    }
}
