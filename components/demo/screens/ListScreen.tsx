import * as React from 'react'
import List from "../../list/List";
import {NavigationProps} from "../demotype";
import Container from "../../ui-provider/UIContainer";
import ChungText from "../../chung-text";
import WhiteSpace from "../../white-space";
import {ScrollView} from "react-native";

export class ListScreen extends React.Component<NavigationProps> {
    render() {
        return (
            <Container>
                <ScrollView>
                    <List
                        headerText={"Header"}
                        footerText={"Footer"}
                    >
                        <List.Item
                            multipleLine
                            thumb={`https://www.gravatar.com/avatar/c397c57d2406dc110a9da249fc0d4292?s=32&d=identicon&r=PG&f=1`}
                            arrow="horizontal">
                            <ChungText numberOfLines={5}>Hello, this is a list item g dfdfsfdsdfs dds df sdf sdf sdsf
                                dfs
                                dsf dsfd sfd sfdsf dfs ffgdfdgdgf fdg fgd fdgfdgfgd dfg fdfdg</ChungText>
                        </List.Item>
                    </List>
                    <WhiteSpace/>

                    <List.Item
                        onLongPress={() => alert('dfdfdf')}
                        disableBorder={"top"}>
                        <ChungText>No top border</ChungText>
                    </List.Item>
                    <List.Item
                        onLongPress={() => alert('dfdfdf')}
                        disableBorder={"top"}>
                        <ChungText>No top border</ChungText>
                    </List.Item>

                    <WhiteSpace/>

                    <List.Item
                        onLongPress={() => alert('dfdfdf')}
                        disableBorder={"all"}>
                        <ChungText>No borders at all</ChungText>
                    </List.Item>
                    <List.Item
                        onLongPress={() => alert('dfdfdf')}
                        disableBorder={"all"}>
                        <ChungText>No borders at all</ChungText>
                    </List.Item>

                    <WhiteSpace>
                        <List.Item
                            onLongPress={() => alert('dfdfdf')}
                            disableBorder={"bottom"}>
                            <ChungText>No Bottom border</ChungText>
                        </List.Item>
                        <List.Item
                            onLongPress={() => alert('dfdfdf')}
                            disableBorder={"bottom"}>
                            <ChungText>No Bottom border</ChungText>
                        </List.Item>
                    </WhiteSpace>
                </ScrollView>
            </Container>
        )
    }
}
