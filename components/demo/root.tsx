import * as React from 'react'
import {createStackNavigator} from 'react-navigation';
import {HomeScreen} from "./screens/HomeScreen";
import {screenKeys} from "./data/ScreenKeys";
import {AccordionScreen} from "./screens/AccordionScreen";
import {ListScreen} from "./screens/ListScreen";
import {TextAreaScreen} from "./screens/TextAreaScreen";
import {InputItemScreen} from "./screens/InputItemScreen";

const RootStack = createStackNavigator(
    {
        [screenKeys.home]: HomeScreen,
        [screenKeys.accordion]:AccordionScreen,
        [screenKeys.list]:ListScreen,
        [screenKeys.textArea]:TextAreaScreen,
        [screenKeys.inputItem]:InputItemScreen

    },
    {
        initialRouteName: screenKeys.inputItem,
    }
);

export default class App extends React.Component {
    render() {return <RootStack/>;}
}
