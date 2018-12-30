import * as React from 'react'
import {NavigationProps} from "../demotype";
import Card from "../../card/Card";
import CardHeader from "../../card/CardHeader";
import CardBody from "../../card/CardBody";
import CardFooter from "../../card/CardFooter";
import UIContainer from "../../ui-provider/UIContainer";
import ChungText from "../../chung-text/ChungText";
import {View} from "react-native";

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
                <Card marginVertical>
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
