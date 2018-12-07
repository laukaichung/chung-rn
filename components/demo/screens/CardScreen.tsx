import * as React from 'react'
import {NavigationProps} from "../demotype";
import Card from "../../card";
import CardHeader from "../../card/CardHeader";
import CardBody from "../../card/CardBody";
import CardFooter from "../../card/CardFooter";
import UIContainer from "../../ui-provider/UIContainer";
import ChungText from "../../chung-text";

interface State {
    modal: boolean
}

export class CardScreen extends React.Component<NavigationProps, State> {
    public state: State = {} as State;

    public render() {
        return (
            <UIContainer>
                <Card marginVertical full>
                    <CardHeader title={<ChungText>Hello</ChungText>}/>
                    <CardBody padding>
                        <ChungText>Body Text</ChungText>
                    </CardBody>
                    <CardFooter extra={`Extra`}/>
                </Card>
                <Card marginVertical>
                    <CardHeader title={<ChungText>Hello</ChungText>}/>
                    <CardBody padding>
                        <ChungText>Body Text</ChungText>
                    </CardBody>
                    <CardFooter extra={`Extra`}/>
                </Card>
            </UIContainer>
        )
    }
}
