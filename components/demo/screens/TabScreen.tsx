import * as React from 'react'
import {ScreenProps} from "../../type";
import {Text} from 'react-native'
import Tabs from "../../tabs/Tabs";

interface InputItemScreenProps extends ScreenProps {

}

export class TabScreen extends React.Component<InputItemScreenProps> {
    render() {
        return (
            <Tabs tabs={[
                {title:"A"},
                {title:"B"}
            ]}>
                <Text>Hello 1</Text>
                <Text>Hello 2</Text>
            </Tabs>
        )
    }
}
