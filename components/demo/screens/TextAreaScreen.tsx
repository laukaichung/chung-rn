import * as React from 'react'
import {View,Text} from "react-native";
import {ScreenProps} from "../../type";
import List from "../../list/List";
import TextAreaItem from "../../textarea-item/TextAreaItem";

interface HomeScreenProps extends ScreenProps {

}

export class TextAreaScreen extends React.Component<HomeScreenProps> {
    render() {
        return (
            <View>
                <List>
                    <List.Item>
                        <Text>Hello</Text>
                    </List.Item>
                    <TextAreaItem last
                                  placeholder={`Enter Here`}
                                  rows={5}
                                  count={40}
                                  onChange={(val)=>console.log(val)}/>
                </List>
            </View>
        )
    }
}
