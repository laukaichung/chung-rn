import * as React from 'react'
import List from "../../List";
import {NavigationProps} from "../demotype";
import Container from "../../UIMainContainer";
import ChungText from "../../ChungText";
import WhiteSpace from "../../WhiteSpace";
import {ScrollView, View} from "react-native";
import {ListItem} from "../../index";
import CustomSwipeable from "../../CustomSwipeable";
import {RectButton} from "react-native-gesture-handler";

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
                    <ListItem
                        arrow="right"
                        extra={<ChungText>Extra</ChungText>}
                        onLongPress={() => alert('dfdfdf')}
                    >
                        <ChungText>No top border</ChungText>
                    </ListItem>

                    <ListItem
                        bottomExtraView={(
                            <View style={{width: 100, height: 100, backgroundColor: "red"}}/>
                        )}
                        onLongPress={() => alert('dfdfdf')}
                    >
                        <ChungText>Extra Bottom View</ChungText>
                    </ListItem>
                    <ListItem
                        swipeableProps={{
                            rightView: (
                                <ChungText>Swipe from the view!</ChungText>
                            )
                        }}
                    >
                        <ChungText>Swipeable list item</ChungText>
                    </ListItem>
                    <CustomSwipeable
                        leftContainerStyle={
                            {flex: 1, justifyContent: "flex-end", flexDirection: "row"}
                        }
                        leftView={(
                            <View>
                                <ChungText>
                                    From the left!
                                </ChungText>
                            </View>
                        )}
                    >
                        <ListItem>
                            <ChungText>Swipeable from the left</ChungText>
                        </ListItem>
                    </CustomSwipeable>

                    <CustomSwipeable
                        rightContainerStyle={
                            {flex: 1, justifyContent: "center", flexDirection: "row"}
                        }
                        rightView={(
                            <View>
                                <ChungText>
                                    Swipe from the right.
                                </ChungText>
                            </View>
                        )}
                    >
                        <ListItem>
                            <ChungText>Swipeable custom view</ChungText>
                        </ListItem>
                    </CustomSwipeable>


                    <CustomSwipeable
                        rightMenu={[

                            {
                                view: (
                                    <RectButton
                                        style={[ {
                                            backgroundColor: "red",
                                            alignItems: 'center',
                                            flex: 1,
                                            justifyContent: 'center',
                                        }]}
                                        onPress={()=> alert("ppp")}>
                                        <ChungText>yyyyy</ChungText>
                                    </RectButton>
                                )
                            }
                        ]}
                    >
                        <ListItem>
                            <ChungText>Swipeable custom view</ChungText>
                        </ListItem>
                    </CustomSwipeable>

                </ScrollView>
            </Container>
        )
    }
}
