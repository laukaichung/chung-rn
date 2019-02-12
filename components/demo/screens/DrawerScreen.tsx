import * as React from 'react'
import {NavigationProps} from "../demotype";
import UIContainer from "../../UIContainer";
import List from "../../List";
import {screenKeys} from "../data/ScreenKeys";
import ChungText from "../../ChungText";
import {StackActions} from "react-navigation";
import {ScrollView} from "react-native";

interface DrawerScreenProps {
    navigation: NavigationProps
}

export class DrawerScreen extends React.Component<DrawerScreenProps> {

    public render() {
        let {navigation: {navigation}} = this.props;
        return (
            <UIContainer drawer>
                <ScrollView>
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
            </UIContainer>
        )
    }

}
