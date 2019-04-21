import * as React from 'react'
import List from "../../List";
import Badge from "../../Badge";
import {NavigationProps} from "../demotype";
import UIMainContainer from "../../UIMainContainer";
import ChungText from "../../ChungText";
import {ListItem} from "../../index";

export class BadgeScreen extends React.Component<NavigationProps> {

    render() {
        return (
            <UIMainContainer>
                <List>
                    <ListItem extra={<Badge>1234</Badge>}>
                        <ChungText>Hello</ChungText>
                    </ListItem>
                    <ListItem extra={<ChungText>Extra</ChungText>}>
                        <ChungText>Hello</ChungText>
                    </ListItem>
                </List>
            </UIMainContainer>
        )
    }

}
