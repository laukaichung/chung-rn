import * as React from 'react'
import {Text} from 'react-native'
import List from "../../List";
import Badge from "../../Badge";
import {NavigationProps} from "../demotype";
import UIContainer from "../../UIContainer";
import ChungText from "../../ChungText";

export class BadgeScreen extends React.Component<NavigationProps> {

    render() {
        return (
            <UIContainer>
                <List>
                    <List.Item extra={<Badge text={"1234"}/>}>
                        <ChungText>Hello</ChungText>
                    </List.Item>
                    <List.Item extra={<ChungText>Extra</ChungText>}>
                        <ChungText>Hello</ChungText>
                    </List.Item>
                </List>
            </UIContainer>
        )
    }

}
