import * as React from 'react'
import DateTimePicker, {DateTimePickerProps} from 'react-native-modal-datetime-picker';
import List from "../list/List";
import Label from "../label";
import {ListItemCommonProps} from "../list/ListItem";
import ChungText from "../chung-text";
import UIContext from "../ui-provider/UIContext";
import Styles from "../style";

export interface DateTimePickerModalProps extends DateTimePickerProps, ListItemCommonProps {
    label: string;
    date?: Date
    renderDateValue?: (date: Date) => string
}

interface State {
    isVisible: boolean
    date?: Date;
}

export default class DateTimePickerModal extends React.Component<DateTimePickerModalProps, State> {
    public state: State = {isVisible: false, date: this.props.date};

    public render() {
        let {state, props} = this;
        let {isVisible, date} = state;
        let {onConfirm, onCancel, label, disableBorder, renderDateValue} = props;
        return (
            <UIContext.Consumer>
                {
                    ({isDarkMode}) =>
                        <List.Item
                            disableBorder={disableBorder}
                            onPress={() => this.setState({isVisible: true})}
                            arrow="horizontal">
                            <Label text={label}/>
                            {date &&
                            <ChungText>{renderDateValue ? renderDateValue(date) : date.toDateString()}</ChungText>}
                            <DateTimePicker
                                {...props}
                                isVisible={isVisible}
                                onConfirm={(date) => {
                                    this.setState({isVisible: false, date});
                                    onConfirm(date)
                                }}
                                onCancel={() => {
                                    this.setState({isVisible: false})
                                    if (onCancel) onCancel(null)
                                }}
                                confirmTextStyle={isDarkMode?{color:Styles.textColor}:null}
                                cancelTextStyle={isDarkMode?{color:Styles.textColor}:null}
                                datePickerContainerStyleIOS={isDarkMode?{backgroundColor:Styles.backgroundColor}:null}
                                titleStyle={isDarkMode ? {color:Styles.headerColor}:null}

                            />
                        </List.Item>
                }
            </UIContext.Consumer>
        )
    }
}
