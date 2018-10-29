import * as React from 'react'
import {RNScreenProps} from "../demotype";
import {Text} from 'react-native'
import {Toast} from "../../index";

interface Props extends RNScreenProps {

}

export class ToastScreen extends React.Component<Props> {
    public render() {
        return (
            <Text>Hello</Text>

        )
    }

    public componentDidMount() {
        Toast.fail("Fail Toast")
    }
}
