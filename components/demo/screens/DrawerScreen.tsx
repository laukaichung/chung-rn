import * as React from 'react'
import {NavigationProps} from "../demotype";
import UIContainer from "../../ui-provider/UIContainer";
import List from "../../list/List";
import {screenKeys} from "../data/ScreenKeys";
import ChungText from "../../chung-text/ChungText";
import {NavigationActions} from "react-navigation";
import {ScrollView} from "react-native";

interface DrawerScreenProps {
    navigation: NavigationProps
}

export class DrawerScreen extends React.Component<DrawerScreenProps> {

    public render() {
        let {navigation: {navigation}} = this.props;
        return (
            <UIContainer>
                <ScrollView>
                    {
                        Object.keys(screenKeys).map((screen) => {
                            return (
                                <List.Item key={screen} onPress={() => {
                                    navigation.dispatch(
                                        NavigationActions.navigate({
                                            routeName: screen,
                                        })
                                    )

                                }}>
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
