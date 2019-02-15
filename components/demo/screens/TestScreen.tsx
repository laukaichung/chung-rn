import * as React from 'react'
import {NavigationProps} from "../demotype";
import {LayoutRectangle} from "react-native";

interface TestState {
    targetIsVisible: boolean;
    targetLayout?: LayoutRectangle;

}

export default class TestScreen extends React.Component<NavigationProps, TestState> {
    render(){
        return null;
    }
}
