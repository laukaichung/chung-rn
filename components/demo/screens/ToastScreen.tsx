import * as React from 'react'
import {NavigationProps} from "../demotype";
import {Toast} from "../../index";
import ToastContainer from "../../ToastContainer";

export class ToastScreen extends React.Component<NavigationProps> {
    public render() {
        return (
            <ToastContainer content={"dsfdf"}/>
        )
    }

    public componentDidMount() {
        Toast.fail("Fail Toast")
    }
}
