import * as React from 'react'
import {createAppContainer, createDrawerNavigator} from 'react-navigation';
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
import {CameraRollImageList} from "./screens/CameraRollImageList";
import {ImagePickerItemModalScreen} from "./screens/ImagePickerItemModalScreen";
import {ToastScreen} from "./screens/ToastScreen";
import UIProvider from "../ui-provider";
import {TabScreen} from "./screens/TabScreen";
import {View} from "react-native";
import Button from "../button";
import UIContext from "../ui-provider/UIContext";
import Styles from "../style";
import ResultScreen from "./screens/ResultScreen";

const AppNavigator = createDrawerNavigator(
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
        [screenKeys.oldTabs]: TabScreen,
        [screenKeys.result]: ResultScreen
    },
    {
        initialRouteName: screenKeys.home,
        defaultNavigationOptions: ({navigation}) => {
            return {
                headerRight: (
                    <View>
                        <UIContext.Consumer>
                            {
                                ({theme, toggleTheme}) => {
                                    return (
                                        <Button size="small" onPress={toggleTheme}>
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

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

    render() {
        return (
            <UIProvider>
                <AppContainer/>
            </UIProvider>
        )
    }
}
