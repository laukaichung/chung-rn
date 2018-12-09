import * as React from 'react'
import {NavigationProps} from "../demotype";
import InputItem from "../../input-item";
import List from "../../list/List";
import CheckboxItem from "../../checkbox/CheckboxItem";
import RadioItem from "../../radio/RadioItem";
import DateTimePickerModal from "../../date-time-picker-modal";
import TextAreaItem from "../../textarea-item";
import UIContainer from "../../ui-provider/UIContainer";
import {ScrollView} from "react-native";


export default class FormScreen extends React.Component<NavigationProps> {
    render() {
        return (
            <UIContainer>
                <ScrollView>
                    <List>
                        <InputItem label={"Input"}
                                   error
                                   extra={"Hello"}
                                   placeholder={"Some Holder"}/>

                        <InputItem label={"Numeric Input"}
                                   type={"numeric"}
                                   onChange={(val) => console.log(val)}
                                   placeholder={"Enter Int Val"}/>

                        <InputItem label={"Float Input"}
                                   type={"decimal-pad"}
                                   onChange={(val) => console.log(val)}
                                   placeholder={"Enter Float Val"}/>

                        <TextAreaItem rows={2} label="Text Area"/>

                        <CheckboxItem label={"Checkbox"}/>
                        <RadioItem label={"Radio"}/>

                        <CheckboxItem disabled label={"Disabled Checkbox"}/>
                        <RadioItem disabled label={"Disabled Radio"}/>

                        <DateTimePickerModal
                            label={"Select Date"}
                            onCancel={() => console.log('cancel')}
                            onConfirm={(date) => console.log({date})}/>
                    </List>
                </ScrollView>
            </UIContainer>
        )
    }
}
