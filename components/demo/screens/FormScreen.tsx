import * as React from 'react'
import {NavigationProps} from "../demotype";
import InputListItem from "../../input-list-item/InputListItem";
import List from "../../list/List";
import CheckboxListItem from "../../checkbox/CheckboxListItem";
import RadioListItem from "../../radio/RadioListItem";
import DateTimePickerModal from "../../date-time-picker-modal/DateTimePickerModal";
import TextAreaListItem from "../../textarea-list-item/TextAreaListItem";
import UIContainer from "../../ui-provider/UIContainer";
import {ScrollView} from "react-native";


export default class FormScreen extends React.Component<NavigationProps> {
    render() {
        return (
            <UIContainer>
                <ScrollView>
                    <List>
                        <InputListItem label={"Input"}
                                       error
                                       extra={"Hello"}
                                       placeholder={"Some Holder"}/>

                        <InputListItem label={"Numeric Input"}
                                       type={"numeric"}
                                       hint={"fdsdfsdfs asfd sd sdfds ffsd f sd sdf"}
                                       onChange={(val) => console.log(val)}
                                       placeholder={"Enter Int Val"}/>

                        <InputListItem label={"Float Input"}
                                       type={"decimal-pad"}
                                       onChange={(val) => console.log(val)}
                                       placeholder={"Enter Float Val"}/>

                        <TextAreaListItem placeholder={`sda dsffsd fsdfsdsfd sfdsdf sdf sdf sfd fdsfsdfsdsdf sfdsfd sdf sdfsd f sdfsdf sd fds`}
                                          rows={5}
                                          error
                                          hint={"Hint text"}
                                          count={400}
                                          onClear={()=>alert('clear!!')}
                                          autoHeight
                                          label="Text Area"/>

                        <CheckboxListItem label={"Checkbox"}/>
                        <RadioListItem label={"Radio"}/>

                        <CheckboxListItem label={"Disabled Checkbox"}/>
                        <RadioListItem disabled label={"Disabled Radio"}/>

                        <DateTimePickerModal
                            hint={"sdsfdsfdsf"}
                            label={"Select Date"}
                            onCancel={() => console.log('cancel')}
                            onConfirm={(date) => console.log({date})}/>
                    </List>
                </ScrollView>
            </UIContainer>
        )
    }
}
