import * as React from 'react'
import {ScreenProps} from "../../type";
import InputItem from "../../input-item/InputItem";
import List from "../../list/List";
import TextAreaItem from "../../textarea-item/TextAreaItem";

interface InputItemScreenProps extends ScreenProps {

}

export class InputItemScreen extends React.Component<InputItemScreenProps> {
    render() {
        return (
            <List>
                <InputItem label={"Label"} placeholder={"Some Holder"}/>
                <TextAreaItem last/>
            </List>
        )
    }
}
