import * as React from 'react'
import DateTimePicker, {DateTimePickerProps} from 'react-native-modal-datetime-picker';
import List from "./List";
import ChungText from "./ChungText";
import Styles from "./Styles";
import {FormCommonProps, FormListItemCommonProps} from "./type";
import FormHeader from "./FormHeader";

export interface DateTimePickerModalProps extends DateTimePickerProps, FormListItemCommonProps,FormCommonProps {
    date?: Date
    renderDateValue?: (date: Date) => string;
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
        let {onConfirm, onCancel,listItemProps = {}, renderDateValue} = props;
        let {isDarkMode} = Styles;
        return (

            <List.Item
                {...listItemProps}
                onPress={() => this.setState({isVisible: true})}
                arrow="right">
                <FormHeader {...props}/>
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
                    confirmTextStyle={isDarkMode ? {color: Styles.textColor} : null}
                    cancelTextStyle={isDarkMode ? {color: Styles.textColor} : null}
                    datePickerContainerStyleIOS={isDarkMode ? {backgroundColor: Styles.backgroundColor} : null}
                    titleStyle={isDarkMode ? {color: Styles.headerColor} : null}

                />
            </List.Item>
        )
    }
}
