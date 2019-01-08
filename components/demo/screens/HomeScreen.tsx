import * as React from 'react'
import {NavigationProps} from "../demotype";
import Button from "../../Button";
import ChungText from "../../ChungText";
import List from "../../List";
import Styles from "../../Styles";
import WingBlank from "../../WingBlank";
import Container from "../../UIContainer";
import UIContext from "../../UIContext";
import Header from "../../Header";
import WhiteSpace from "../../WhiteSpace";

interface State {

}

export class HomeScreen extends React.Component<NavigationProps, State> {
    public render() {
        return (
            <Container>
                <WingBlank>
                    <ChungText>Chung Text</ChungText>
                    <Header>Header</Header>
                    <UIContext.Consumer>
                        {
                            ({theme, toggleTheme}) => {
                                return (
                                    <Button onPress={() => {
                                        toggleTheme();
                                    }}>
                                        Current Theme {Styles.mode}
                                    </Button>
                                )
                            }
                        }
                    </UIContext.Consumer>
                    <WhiteSpace/>
                    <Button disabled onPress={() => {}}>
                        Primary Button
                    </Button>

                    <WhiteSpace/>
                    <Button type="primary" onPress={() => {}}>
                        Primary Button
                    </Button>
                    <WhiteSpace/>
                    <Button type="primary" disabled onPress={() => {}}>
                        Diabled Primary Button
                    </Button>
                </WingBlank>
                <List>
                    <List.Item arrow="right">
                        <ChungText>List Item</ChungText>
                    </List.Item>
                </List>
            </Container>
        )
    }
}
