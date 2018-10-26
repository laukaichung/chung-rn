import * as React from 'react'
import {ScreenProps} from "../../type";
import InputItem from "../../input-item";
import List from "../../list/List";
import {Text} from 'react-native'
import DatePicker from "../../date-picker";
import {Styles} from "../../style/Styles";
import {Label} from "../../index";

interface InputItemScreenProps extends ScreenProps {

}

export class InputItemScreen extends React.Component<InputItemScreenProps> {
    render() {
        return (
            <List>
                <InputItem label={"Label"} error extra={<Text>Hello</Text>} placeholder={"Some Holder"}/>
                <DatePicker
                    mode="date"
                    minDate={new Date(2015, 7, 6)}
                    maxDate={new Date(2026, 11, 3)}
                    format="YYYY-MM-DD">
                    <List.Item multipleLine arrow="horizontal">
                        <Label content="Label"/>
                        <Text style={{color:Styles.colorTextCaption}}>Selected option</Text>
                    </List.Item>
                </DatePicker>
            </List>
        )
    }
}
