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
import CustomSwipeable from "../../CustomSwipeable";

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
                            iconProps={{name: "trash"}}
                            arrow="right"
                        >
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
                        hideBorder={["all"]}>
                        <ChungText>No all borders</ChungText>
                    </List.Item>

                    <List.Item
                        bottomExtraView={(
                            <View style={{width: 100, height: 100, backgroundColor: "red"}}/>
                        )}
                        onLongPress={() => alert('dfdfdf')}
                    >
                        <ChungText>Extra Bottom View</ChungText>
                    </List.Item>
                    <List.Item
                        swipeableProps={{
                            rightMenuList: [
                                {
                                    name: "clock-o",
                                    onPress: ()=> alert('ggffg')
                                }
                            ],
                            leftMenuList: [
                                {
                                    name: "trash",
                                    onPress: ()=> alert('ggffg')
                                }
                            ]
                        }}
                    >
                        <ChungText>Swipeable list item</ChungText>
                    </List.Item>
                    <CustomSwipeable
                        rightMenuList={[
                            {
                                name: "clock-o",
                                onPress: ()=> alert('clock-o')
                            }
                        ]}
                    >
                        <List.Item
                            bottomExtraView={(
                                <View style={{width: 100, height: 100, backgroundColor: "red"}}/>
                            )}
                            onLongPress={() => alert('dfdfdf')}
                        >
                            <ChungText>Swipeable with Extra Bottom View</ChungText>
                        </List.Item>
                    </CustomSwipeable>
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
