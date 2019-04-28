import * as React from 'react'
import DateTimePicker, {DateTimePickerProps} from 'react-native-modal-datetime-picker';
import ChungText from "./ChungText";
import Styles from "./Styles";
import {FormCommonProps, FormListItemCommonProps, TestProps} from "./type";
import FormHeader from "./FormHeader";
import {ListItem} from "./index";

export interface DateTimePickerModalProps extends DateTimePickerProps, FormListItemCommonProps,FormCommonProps, TestProps {
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
        const {state, props} = this;
        const {isVisible, date} = state;
        const {onConfirm, onCancel,listItemProps = {}, renderDateValue} = props;
        const {isDarkMode} = Styles;
        return (
            <ListItem
                border
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
                    confirmTextStyle={isDarkMode ? {color: Styles.fontColor} : null}
                    cancelTextStyle={isDarkMode ? {color: Styles.fontColor} : null}
                    datePickerContainerStyleIOS={isDarkMode ? {backgroundColor: Styles.backgroundColor} : null}
                    titleStyle={isDarkMode ? {color: Styles.headerColor} : null}

                />
            </ListItem>
        )
    }
}
