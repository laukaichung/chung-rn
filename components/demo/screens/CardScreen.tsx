import * as React from 'react'
import {NavigationProps} from "../demotype";
import Card from "../../Card";
import CardHeader from "../../CardHeader";
import CardBody from "../../CardBody";
import CardFooter from "../../CardFooter";
import UIContainer from "../../UIContainer";
import ChungText from "../../ChungText";
import {View} from "react-native";

interface State {
    modal: boolean
}

export class CardScreen extends React.Component<NavigationProps, State> {
    public state: State = {} as State;

    public render() {
        return (
            <UIContainer>
                <Card full>
                    <CardHeader title={<ChungText>Hello</ChungText>}/>
                    <CardBody paddingHorizontal>
                        <ChungText>Body Text</ChungText>
                    </CardBody>
                    <CardFooter extra={(
                        <View style={[{flexDirection: 'row', justifyContent: 'flex-end'}]}>
                            <ChungText>Something</ChungText>
                            <ChungText> Inline</ChungText>
                        </View>
                    )}/>
                </Card>
                <Card full={false}>
                    <CardHeader title={<ChungText>Hello</ChungText>}/>
                    <CardBody paddingHorizontal>
                        <ChungText>Body Text</ChungText>
                    </CardBody>
                    <CardFooter content={"Content"} extra={`Extra`}/>
                </Card>
            </UIContainer>
        )
    }
}
