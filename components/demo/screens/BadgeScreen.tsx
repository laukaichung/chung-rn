import * as React from 'react'
import {Text} from 'react-native'
import List from "../../List";
import Badge from "../../Badge";
import {NavigationProps} from "../demotype";
import UIContainer from "../../UIContainer";

export class BadgeScreen extends React.Component<NavigationProps> {

    render() {
        return (
            <UIContainer>
                <List>
                    <List.Item extra={<Badge text={"1234"}/>}>
                        <Text>Hello</Text>
                    </List.Item>
                    <List.Item extra={<Text>Extra</Text>}>
                        <Text>Hello</Text>
                    </List.Item>
                </List>
            </UIContainer>
        )
    }

}
