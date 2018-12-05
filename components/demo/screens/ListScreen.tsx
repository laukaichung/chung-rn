import * as React from 'react'
import {Text, View} from "react-native";
import List from "../../list/List";
import {NavigationProps} from "../demotype";
import Container from "../../theme-provider/ThemeContainer";
import ChungText from "../../chung-text";

export class ListScreen extends React.Component<NavigationProps> {
    render() {
        return (
            <Container>
                <List
                    headerText={"Header"}
                    footerText={"Footer"}
                >
                    <List.Item
                        multipleLine
                        thumb={`https://www.gravatar.com/avatar/c397c57d2406dc110a9da249fc0d4292?s=32&d=identicon&r=PG&f=1`}
                        arrow="horizontal">
                        <ChungText numberOfLines={5}>Hello, this is a list item g dfdfsfdsdfs dds df sdf sdf sdsf  dfs dsf dsfd sfd sfdsf dfs  ffgdfdgdgf fdg fgd fdgfdgfgd dfg fdfdg</ChungText>
                    </List.Item>
                    <List.Item>
                        <ChungText>Hello, last one doesn't have a borderBottom</ChungText>
                    </List.Item>
                    <List.Item
                        onLongPress={()=>alert('dfdfdf')}
                        disableBorder={"top"}>
                        <ChungText>Hello, last one doesn't have a borderBottom</ChungText>
                    </List.Item>
                </List>
            </Container>
        )
    }
}
