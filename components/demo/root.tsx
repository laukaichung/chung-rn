import * as React from 'react'
import {
    createAppContainer,
    NavigationActions,
    StackActions
} from 'react-navigation';
import {HomeScreen} from "./screens/HomeScreen";
import {screenKeys} from "./data/ScreenKeys";
import {AccordionScreen} from "./screens/AccordionScreen";
import {ListScreen} from "./screens/ListScreen";
import {TextAreaScreen} from "./screens/TextAreaScreen";
import FormScreen from "./screens/FormScreen";
import {GridScreen} from "./screens/GridScreen";
import {ProgressScreen} from "./screens/ProgressScreen";
import {ActivityIndicatorScreen} from "./screens/ActivityIndicatorScreen";
import {ButtonScreen} from "./screens/ButtonScreen";
import {CardScreen} from "./screens/CardScreen";
import {BadgeScreen} from "./screens/BadgeScreen";
import {PickerModalScreen} from "./screens/PickerModalScreen";
import {ModalScreen} from "./screens/ModalScreen";
import CameraRollImageList from "./screens/CameraRollImageList";
import {ImagePickerItemModalScreen} from "./screens/ImagePickerItemModalScreen";
import {ToastScreen} from "./screens/ToastScreen";
import {View} from "react-native";
import Button from "../Button";
import UIContext from "../UIContext";
import Styles from "../Styles";
import ResultScreen from "./screens/ResultScreen";
import DrawerScreen from "./screens/DrawerScreen";
import {ActionButtonScreen} from "./screens/ActionButtonScreen";
import ChungProvider from "../ChungProvider";
import ChungAlertScreen from "./screens/ChungAlertScreen";
import TestScreen from "./screens/TestScreen";
import TooltipScreen from "./screens/TooltipScreen";
import HintTextScreen from "./screens/HintTextScreen";
import MenuModalScreen from "./screens/MenuModalScreen";
import {createDrawerNavigator} from "react-navigation-drawer";
import {createStackNavigator} from "react-navigation-stack";


const StackNavigator = createStackNavigator(
    {
        [screenKeys.home]: HomeScreen,
        [screenKeys.accordion]: AccordionScreen,
        [screenKeys.list]: ListScreen,
        [screenKeys.textArea]: TextAreaScreen,
        [screenKeys.form]: FormScreen,
        [screenKeys.grid]: GridScreen,
        [screenKeys.progress]: ProgressScreen,
        [screenKeys.activityIndicator]: ActivityIndicatorScreen,
        [screenKeys.button]: ButtonScreen,
        [screenKeys.card]: CardScreen,
        [screenKeys.badge]: BadgeScreen,
        [screenKeys.pickerModal]: PickerModalScreen,
        [screenKeys.modal]: ModalScreen,
        [screenKeys.cameraRollImageList]: CameraRollImageList,
        [screenKeys.imagePickerItemModal]: ImagePickerItemModalScreen,
        [screenKeys.toast]: ToastScreen,
        [screenKeys.actionButton]: ActionButtonScreen,
        [screenKeys.result]: ResultScreen,
        [screenKeys.chungAlert]: ChungAlertScreen,
        [screenKeys.tooltip]: TooltipScreen,
        [screenKeys.test]: TestScreen,
        [screenKeys.hint]: HintTextScreen,
        [screenKeys.menuModal]: MenuModalScreen,
    },
    {
        initialRouteName: screenKeys.tooltip,
        defaultNavigationOptions: ({navigation}) => {
            let isDarkMode = Styles.mode === "dark";
            return {
                headerStyle: isDarkMode ? {backgroundColor: Styles.extremeBackgroundColor} : {},
                headerTitleStyle: isDarkMode ? {color: Styles.fontColor} : {},
                headerTintColor: Styles.fontColor,
                headerRight: (
                    <View>
                        <UIContext.Consumer>
                            {
                                ({theme, toggleTheme}) => {
                                    return (
                                        <Button onPress={() => {
                                            toggleTheme();

                                            const resetAction = StackActions.reset({
                                                index: 0,
                                                actions: [NavigationActions.navigate({routeName: screenKeys.home})],
                                            });
                                            navigation.dispatch(resetAction);
                                        }}
                                        >
                                            Current Theme {Styles.mode}
                                        </Button>
                                    )
                                }
                            }
                        </UIContext.Consumer>
                    </View>
                ),
            };
        }
    }
);

const DrawerNavigator = createDrawerNavigator(
    {
        MainContent: StackNavigator
    },
    /*
    {
        contentComponent: (navigation) => <DrawerScreen/>
    }*/
);

const AppContainer = createAppContainer(DrawerNavigator);

export default class App extends React.Component {
    render() {
        return (
            <ChungProvider>
                <AppContainer/>
            </ChungProvider>
        )
    }
}
