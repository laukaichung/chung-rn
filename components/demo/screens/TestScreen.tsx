import * as React from 'react'
import {NavigationProps} from "../demotype";
import {LayoutRectangle} from "react-native";
import Button from "../../Button";
import WingBlank from "../../WingBlank";
import Container from "../../UIMainContainer";

interface TestState {
    targetIsVisible: boolean;
    targetLayout?: LayoutRectangle;

}

export default class TestScreen extends React.Component<NavigationProps, TestState> {
    render() {
        return (
            <Container>
                <WingBlank>
                    <Button.Animated useNativeDriver={true} animation="bounce" iterationCount={"infinite"}>
                        Hello
                    </Button.Animated>
                </WingBlank>
            </Container>
        );
    }
}
