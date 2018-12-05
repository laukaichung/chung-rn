import * as React from 'react'
import {NavigationProps} from "../demotype";
import InputItem from "../../input-item";
import List from "../../list/List";
import CheckboxItem from "../../checkbox/CheckboxItem";
import RadioItem from "../../radio/RadioItem";
import DateTimePickerModal from "../../date-time-picker-modal";
import TextAreaItem from "../../textarea-item";
import ThemeContainer from "../../theme-provider/ThemeContainer";


export class InputItemScreen extends React.Component<NavigationProps> {
    render() {
        return (
            <ThemeContainer>
                <List>
                    <InputItem label={"Input"}
                               error
                               extra={"Hello"}
                               placeholder={"Some Holder"}/>
                    <TextAreaItem rows={2} label="Text Area"/>
                    <CheckboxItem label={"Checkbox"}/>
                    <RadioItem label={"Radio"}/>
                    <DateTimePickerModal
                        label={"Select Date"}
                        onCancel={() => console.log('cancel')}
                        onConfirm={(date) => console.log({date})}/>
                </List>
            </ThemeContainer>
        )
    }
}
