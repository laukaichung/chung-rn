import * as React from 'react'
import {NavigationProps} from "../demotype";
import {UIDrawerContainer} from "../../UIContainer";
import List from "../../List";
import {screenKeys} from "../data/ScreenKeys";
import ChungText from "../../ChungText";
import {StackActions} from "react-navigation";
import {ScrollView} from "react-native";
import UIContext from "../../UIContext";
import Styles from "../../Styles";

interface DrawerScreenProps {
    navigation: NavigationProps
}

export class DrawerScreen extends React.Component<DrawerScreenProps> {

    public render() {
        let {navigation: {navigation}} = this.props;
        return (
            <UIContext.Consumer>
                {
                    ()=>
                    <ScrollView style={{backgroundColor: Styles.backgroundColor}}>
                        {
                            Object.keys(screenKeys).map((screen) => {
                                return (
                                    <List.Item
                                        key={screen}
                                        onPress={() => {
                                            navigation.dispatch(
                                                StackActions.push({
                                                    routeName: screen,
                                                })
                                            )
                                        }}
                                    >
                                        <ChungText>{screen}</ChungText>
                                    </List.Item>
                                )
                            })
                        }
                    </ScrollView>
                }
            </UIContext.Consumer>
        )
    }

}
