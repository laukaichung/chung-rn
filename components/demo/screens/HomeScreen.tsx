import * as React from 'react'
import {Text, TouchableOpacity, View} from "react-native";
import {RNScreenProps} from "../demotype";
import {screenKeys} from "../data/ScreenKeys";

interface HomeScreenProps extends RNScreenProps{

}

export class HomeScreen extends React.Component<HomeScreenProps>{
    render() {
        return (
            <View>
                <Text>Hello</Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate(screenKeys.accordion)}>
                    <Text>Accordion</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
