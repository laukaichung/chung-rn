import * as React from 'react'
import {NavigationProps} from "../demotype";
import UIContainer from "../../ui-provider/UIContainer";
import Result from "../../result";
import WingBlank from "../../wing-blank";

export default class ResultScreen extends React.Component<NavigationProps> {
    render() {
        return (
            <UIContainer>
                <WingBlank>
                    <Result title={"No Results Found"} message={"This is the message"}/>
                </WingBlank>
                <WingBlank>
                    <Result title={"Success"} message={"This is the message"}/>
                </WingBlank>
            </UIContainer>
        )
    }
}
