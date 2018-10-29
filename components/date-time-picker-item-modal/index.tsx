import * as React from 'react'
import DateTimePicker from 'react-native-modal-datetime-picker';
import {DateTimePickerProps} from 'react-native-modal-datetime-picker'
import List from "../list/List";
import Label from "../label";
import {Text} from 'react-native'
import {ListItemCommonProps} from "../type";

export interface DatePickerItemModalProps extends DateTimePickerProps,ListItemCommonProps{
    label:string;
    date?:Date
    renderDateValue?:(date:Date)=>string
}

interface State {
    isVisible:boolean
    date?:Date;
}

export default class DateTimePickerItemModal extends React.Component<DatePickerItemModalProps, State> {
    public state:State = {isVisible:false,date:this.props.date};
    public render() {
        let {isVisible,date} = this.state;
        let {onConfirm,onCancel,label,disableBorder,renderDateValue} = this.props;
        return (
            <List.Item
                disableBorder={disableBorder}
                onClick={()=>this.setState({isVisible:true})}
                arrow="horizontal">
                <Label content={label}/>
                {date && <Text>{ renderDateValue? renderDateValue(date) : date.toDateString()}</Text>}
                <DateTimePicker
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
