import * as React from 'react'
import {NavigationProps} from "../demotype";
import {Toast} from "../../index";
import ChungText from "../../ChungText";

export class ToastScreen extends React.Component<NavigationProps> {
    public render() {
        return (
            <ChungText>Hello</ChungText>
        )
    }

    public componentDidMount() {
        Toast.fail("Fail Toast")
    }
}
