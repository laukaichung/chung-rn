import * as React from 'react'
import {RNScreenProps} from "../demotype";
import InputItem from "../../input-item";
import List from "../../list/List";
import {Text} from 'react-native'
import CheckboxItem from "../../checkbox/CheckboxItem";
import RadioItem from "../../radio/RadioItem";
import DateTimePickerModal from "../../date-time-picker-modal";
import TextAreaItem from "../../textarea-item";

interface InputItemScreenProps extends RNScreenProps {

}

export class InputItemScreen extends React.Component<InputItemScreenProps> {
    render() {
        return (
            <List>
                <InputItem label={"Input"}
                           error
                           extra={<Text>Hello</Text>}
                           placeholder={"Some Holder"}/>
                <TextAreaItem rows={2} label="Text Area"/>
                <CheckboxItem label={"Checkbox"}/>
                <RadioItem label={"Radio"}/>
                <DateTimePickerModal
                    label={"Select Date"}
                    onCancel={()=>console.log('cancel')}
                    onConfirm={(date)=>console.log({date})}/>
            </List>
        )
    }
}
