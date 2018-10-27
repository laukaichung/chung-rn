import * as React from 'react'
import {createStackNavigator} from 'react-navigation';
import {HomeScreen} from "./screens/HomeScreen";
import {screenKeys} from "./data/ScreenKeys";
import {AccordionScreen} from "./screens/AccordionScreen";
import {ListScreen} from "./screens/ListScreen";
import {TextAreaScreen} from "./screens/TextAreaScreen";
import {InputItemScreen} from "./screens/InputItemScreen";
import {TabScreen} from "./screens/TabScreen";
import {GridScreen} from "./screens/GridScreen";
import {ProgressScreen} from "./screens/ProgressScreen";
import {ActivityIndicatorScreen} from "./screens/ActivityIndicatorScreen";
import {ButtonScreen} from "./screens/ButtonScreen";
import {CardScreen} from "./screens/CardScreen";
import {BadgeScreen} from "./screens/BadgeScreen";
import {PickerModalScreen} from "./screens/PickerModalScreen";
import {ModalScreen} from "./screens/ModalScreen";


const RootStack = createStackNavigator(
    {
        [screenKeys.home]: HomeScreen,
        [screenKeys.accordion]:AccordionScreen,
        [screenKeys.list]:ListScreen,
        [screenKeys.textArea]:TextAreaScreen,
        [screenKeys.inputItem]:InputItemScreen,
        [screenKeys.tabs]:TabScreen,
        [screenKeys.grid]:GridScreen,
        [screenKeys.progress]:ProgressScreen,
        [screenKeys.activityIndicator]:ActivityIndicatorScreen,
        [screenKeys.button]:ButtonScreen,
        [screenKeys.card]:CardScreen,
        [screenKeys.badge]:BadgeScreen,
        [screenKeys.pickerModal]:PickerModalScreen,
        [screenKeys.modal]:ModalScreen
    },
    {
        initialRouteName: screenKeys.modal,
    }

);

export default class App extends React.Component {
    render() {return <RootStack/>;}
}
