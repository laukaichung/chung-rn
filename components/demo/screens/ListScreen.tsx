import * as React from 'react'
import List from "../../List";
import {NavigationProps} from "../demotype";
import Container from "../../UIContainer";
import ChungText from "../../ChungText";
import WhiteSpace from "../../WhiteSpace";
import {ScrollView, View} from "react-native";
import {ListItem} from "../../index";
import Flex from "../../Flex";
import FlexItem from "../../FlexItem";

export class ListScreen extends React.Component<NavigationProps> {

    public render() {
        return (
            <Container>
                <ScrollView>
                    <List
                        headerText={"Header"}
                        footerText={"Footer"}
                    >
                        <ListItem
                            thumb={`https://www.gravatar.com/avatar/c397c57d2406dc110a9da249fc0d4292?s=32&d=identicon&r=PG&f=1`}
                            arrow="right">
                            <ChungText numberOfLines={5}>Hello, this is a list item g dfdfsfdsdfs dds df sdf sdf sdsf
                                dfs
                                dsf dsfd sfd sfdsf dfs ffgdfdgdgf fdg fgd fdgfdgfgd dfg fdfdg</ChungText>
                        </ListItem>
                    </List>
                    <WhiteSpace/>

                    <List.Item
                        arrow="right"
                        extra={<ChungText>Extra</ChungText>}
                        onLongPress={() => alert('dfdfdf')}
                        hideBorder={["top"]}>
                        <ChungText>No top border</ChungText>
                    </List.Item>
                    <List.Item
                        onLongPress={() => alert('dfdfdf')}
                        hideBorder={["top", "left"]}>
                        <ChungText>No top left border</ChungText>
                    </List.Item>

                    <WhiteSpace/>

                    <List.Item
                        onLongPress={() => alert('dfdfdf')}
                        hideBorder={["all"]}>
                        <ChungText>No borders at all</ChungText>
                    </List.Item>
                    <List.Item
                        onLongPress={() => alert('dfdfdf')}
                        hideBorder={["all"]}>
                        <ChungText>No borders at all</ChungText>
                    </List.Item>

                    <List.Item
                        bottomExtraView={(
                            <View style={{width: 100, height: 100, backgroundColor: "red"}}/>
                        )}
                        onLongPress={() => alert('dfdfdf')}>
                        <ChungText>Extra Bottom View</ChungText>
                    </List.Item>

                    <Flex>
                        <FlexItem>
                            <ListItem arrow="right">
                                <ChungText>Center that</ChungText>
                            </ListItem>
                        </FlexItem>
                        <FlexItem>
                            <ListItem arrow="right">
                                <ChungText>Center this</ChungText>
                            </ListItem>
                        </FlexItem>
                    </Flex>

                </ScrollView>
            </Container>
        )
    }
}
