import * as React from 'react'
import RCDatePicker from 'rmc-date-picker/lib/DatePicker';
import PopupDatePicker from 'rmc-date-picker/lib/Popup';
import {formatFn} from './utils';
import DatePickerLocale from 'rmc-date-picker/lib/locale/en_US';
import {pickerStyles} from "./PickerStyles";

export interface DatePickerNativeProps {
    triggerTypes?: string;
    value?: Date;
    mode?: 'datetime' | 'date' | 'year' | 'month' | 'time';
    minDate?: Date;
    maxDate?: Date;
    onChange?: (value: Date) => void;
    onValueChange?: (vals: any, index: number) => void;
    visible?: boolean;
    onDismiss?: () => void;
    locale?: {
        okText: string;
        dismissText: string;
        extra: string;
        DatePickerLocale: {
            year: string;
            month: string;
            day: string;
            hour: string;
            minute: string;
            am?: string;
            pm?: string;
        };
    };
    minuteStep?: number;
    disabled?: boolean;
    format?: string | ((value: Date) => string);
    extra?: string;
    children?: React.ReactNode;
    dismissText?: React.ReactNode;
    okText?: React.ReactNode;
    title?: React.ReactNode;
    label?: string;
}


export default class DatePicker extends React.Component<DatePickerNativeProps, any> {
    static defaultProps = {
        mode: 'datetime',
        triggerType: 'onClick',
        minuteStep: 1,
    };

    public render() {
        const {props} = this;
        const {children, value, dismissText, okText, onValueChange,minDate, maxDate, minuteStep, mode, extra} = props;
        const dataPicker = (
            <RCDatePicker
                minuteStep={minuteStep}
                locale={DatePickerLocale}
                mode={mode}
                minDate={minDate}
                maxDate={maxDate}
                defaultDate={value}
                onValueChange={onValueChange}
            />
        );


        return (
            <PopupDatePicker
                datePicker={dataPicker}
                styles={pickerStyles}
                {...props as any}
                date={value}
                dismissText={dismissText || "Cancel"}
                okText={okText || "OK"}
            >
                {children &&
                React.isValidElement(children) &&
                React.cloneElement<DatePickerNativeProps>(children, {
                    extra: value ? formatFn(this, value) : extra,
                })}
            </PopupDatePicker>
        );
    }
}
