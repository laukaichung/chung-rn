import * as React from 'react'
import {NavigationProps} from "../demotype";
import UIContainer from "../../ui-provider/UIContainer";
import Result from "../../result";
import WingBlank from "../../wing-blank";
import WhiteSpace from "../../white-space";

export default class ResultScreen extends React.Component<NavigationProps> {
    render() {
        return (
            <UIContainer>
                <WhiteSpace/>
                <Result title={"Warning"}
                        type="warning"
                        message={"This is a message"}/>
                <WhiteSpace/>
                <Result title={"Success"}
                        type="success"
                        message={"This is a message"}/>
                <WhiteSpace/>
                <Result title={"Error"}
                        type="error"
                        message={"This is a message"}/>
            </UIContainer>
        )
    }
}
