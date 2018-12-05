import * as React from 'react'
import DateTimePicker from 'react-native-modal-datetime-picker';
import {DateTimePickerProps} from 'react-native-modal-datetime-picker'
import List from "../list/List";
import Label from "../label";
import {Text} from 'react-native'
import {ListItemCommonProps} from "../list/ListItem";

export interface DateTimePickerModalProps extends DateTimePickerProps,ListItemCommonProps{
    label:string;
    date?:Date
    renderDateValue?:(date:Date)=>string
}

interface State {
    isVisible:boolean
    date?:Date;
}

export default class DateTimePickerModal extends React.Component<DateTimePickerModalProps, State> {
    public state:State = {isVisible:false,date:this.props.date};
    public render() {
        let {state,props} = this;
        let {isVisible,date} = state;
        let {onConfirm,onCancel,label,disableBorder,renderDateValue} = props;
        return (
            <List.Item
                disableBorder={disableBorder}
                onPress={()=>this.setState({isVisible:true})}
                arrow="horizontal">
                <Label text={label}/>
                {date && <Text>{ renderDateValue? renderDateValue(date) : date.toDateString()}</Text>}
                <DateTimePicker
                    {...props}
                    isVisible={isVisible}
                    onConfirm={(date)=>{
                        this.setState({isVisible:false,date});
                        onConfirm(date)
                    }}
                    onCancel={()=>{
                        this.setState({isVisible:false})
                        if(onCancel) onCancel(null)
                    }}
                />
            </List.Item>
        )
    }
}
