import * as React from 'react'
import {RNScreenProps} from "../demotype";
import OldTabs from "../../tabs/OldTabs";
import {Text} from 'react-native'
interface Props extends RNScreenProps {

}

export class OldTabScreen extends React.Component<Props> {
    public render() {
        return (
            <OldTabs tabs={[{title:"A"},{title:"B"}]}>
                <Text>A</Text>
                <Text>B</Text>
            </OldTabs>

        )
    }
}
