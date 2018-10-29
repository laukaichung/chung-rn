import * as React from 'react'
import {RNScreenProps} from "../demotype";
import Tabs from "../../tabs/Tabs";
import {Text} from 'react-native'
interface Props extends RNScreenProps {

}

export class OldTabScreen extends React.Component<Props> {
    public render() {
        return (
            <Tabs tabs={[{title:"A"},{title:"B"}]}>
                <Text>A</Text>
                <Text>B</Text>
            </Tabs>

        )
    }
}
