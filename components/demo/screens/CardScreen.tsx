import * as React from 'react'
import {ScreenProps} from "../../type";
import {Text} from 'react-native'
import Card from "../../card";
import CardHeader from "../../card/CardHeader";
import CardBody from "../../card/CardBody";
import CardFooter from "../../card/CardFooter";

interface CardScreenProps extends ScreenProps {

}

interface State {
    modal: boolean
}

export class CardScreen extends React.Component<CardScreenProps, State> {
    public state: State = {} as State;

    public render() {
        return (
            <Card marginVertical full>
                <CardHeader title="Hello"/>
                <CardBody>
                    <Text>Body Text</Text>
                </CardBody>
                <CardFooter extra={<Text>Extra</Text>}/>
            </Card>
        )
    }
}
