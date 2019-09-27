import * as React from 'react'
import {screenKeys} from "../data/ScreenKeys";
import ChungText from "../../ChungText";
import {StackActions} from "react-navigation";
import {ScrollView} from "react-native";
import UIContext from "../../UIContext";
import Styles from "../../Styles";
import {ListItem} from "../../index";
import {useNavigation} from "react-navigation-hooks";

const DrawerScreen = () => {
    const {dispatch} = useNavigation();
    return (
        <UIContext.Consumer>
            {
                () =>
                    <ScrollView style={{backgroundColor: Styles.backgroundColor}}>
                        {
                            Object.keys(screenKeys).map((screen) => {
                                return (
                                    <ListItem
                                        key={screen}
                                        onPress={() => {
                                            dispatch(
                                                StackActions.push({
                                                    routeName: screen,
                                                })
                                            )
                                        }}
                                    >
                                        <ChungText>{screen}</ChungText>
                                    </ListItem>
                                )
                            })
                        }
                    </ScrollView>
            }
        </UIContext.Consumer>
    )
}

export default DrawerScreen