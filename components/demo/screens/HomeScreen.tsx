import * as React from 'react'
import {NavigationProps} from "../demotype";
import Button from "../../button/Button";
import ChungText from "../../chung-text/ChungText";
import List from "../../list/List";
import Styles from "../../styles/Styles";
import WingBlank from "../../wing-blank/WingBlank";
import Container from "../../ui-provider/UIContainer";
import UIContext from "../../ui-provider/UIContext";
import Header from "../../header/Header";
import WhiteSpace from "../../white-space/WhiteSpace";

interface State {

}

export class HomeScreen extends React.Component<NavigationProps, State> {
    public render() {
        let {navigation} = this.props;
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
