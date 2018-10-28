import * as React from 'react'
import {RNScreenProps} from "../demotype";
import {Text} from 'react-native'
import List from "../../list/List";
import Badge from "../../badge";

interface BadgeScreenProps extends RNScreenProps {

}

export class BadgeScreen extends React.Component<BadgeScreenProps> {
    render() {
        return (
            <List>
                <List.Item extra={<Badge text={"1234"}/>}>
                    <Text>Hello</Text>
                </List.Item>
                <List.Item extra={<Text>Extra</Text>}>
                    <Text>Hello</Text>
                </List.Item>
            </List>
        )
    }
}
