import * as React from 'react'
import {NavigationProps} from "../demotype";
import {Text} from 'react-native'
import {Toast} from "../../index";

export class ToastScreen extends React.Component<NavigationProps> {
    public render() {
        return (
            <Text>Hello</Text>
        )
    }

    public componentDidMount() {
        Toast.fail("Fail Toast")
    }
}
