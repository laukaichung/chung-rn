import * as React from 'react'
import {NavigationProps} from "../demotype";
import UIContainer from "../../UIContainer";
import Result from "../../Result";
import WingBlank from "../../WingBlank";
import WhiteSpace from "../../WhiteSpace";

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
