import * as React from 'react'
import {NavigationProps} from "../demotype";
import {screenKeys} from "../data/ScreenKeys";
import Button from "../../button";
import {NavigationActions, StackActions} from "react-navigation";
import ChungText from "../../chung-text";
import List from "../../list";
import Styles from "../../style";
import WingBlank from "../../wing-blank";
import Container from "../../ui-provider/UIContainer";
import UIContext from "../../ui-provider/UIContext";
import Header from "../../header";
import WhiteSpace from "../../white-space";

interface State {

}

export class HomeScreen extends React.Component<NavigationProps, State> {
    public render() {
        let {navigation} = this.props;
        return (
            <Container>
                <WingBlank>
                    <ChungText>Chung Text</ChungText>
                    <Header text={"Header"}/>
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

                    <WhiteSpace/>
                    <Button type="ghost" onPress={() => {}}>
                        Ghost Button
                    </Button>
                    <WhiteSpace/>

                    <Button type="ghost" disabled onPress={() => {}}>
                        Diabled Ghost Button
                    </Button>
                </WingBlank>
                <List>
                    <List.Item arrow="horizontal">
                        <ChungText>List Item</ChungText>
                    </List.Item>
                </List>
            </Container>
        )
    }
}
