import * as React from 'react'
import {ScrollView, Text, View} from "react-native";
import Grid from "../grid";
import CustomModal, {CustomModalProps} from "../modal";
import List from "../list"
import {Styles} from "../style/Styles";
import StringUtil from "../util/StringUtil";
import {HintText} from "../hint-text";
import Label from "../label";

export interface PickerModalProps extends CustomModalProps{
    data: SelectOptionModel;
    label?: string,
    hint?: string;
    displayTextAsValue?: boolean;
    columnNum?: number;
    closeModalAfterOptionSelected?: boolean;
}

interface SelectOptionModel {
    [text: string]: any;
}

interface PickerModalCore extends PickerModalProps {
    onChange: (option: Option) => void;
    value: any;
}

interface Option {
    text: string,
    value: any
}

const PickerModal = (props: PickerModalCore) => {
    const {data, value, buttonTrigger, hint,displayTextAsValue, label,onChange, closeModalAfterOptionSelected = true, columnNum = 3} = props;
    let list: Array<Option> = [];
    for (let title in data) {
        list.push({text: title, value: data[title]});
    }

    let displayValue = displayTextAsValue ? getOptionKey(data, value) : value;
    return (
        <CustomModal
            {...props}
            buttonTrigger={
                buttonTrigger ||
                <List.Item extra={StringUtil.capitalize(displayValue)} arrow="horizontal">
                    <Label content={label}/>
                </List.Item>
            }>
            {
                ({closeModal}) => {
                    return (
                        <ScrollView>
                            {hint && <HintText content={hint}/>}
                            <Grid columnNum={columnNum}
                                  data={list}
                                  onClick={(option: Option) => {
                                      onChange(option);
                                      if (closeModalAfterOptionSelected)
                                          closeModal()
                                  }}
                                  renderItem={(option: Option) => {
                                      return (
                                          <PickerOption selectedValue={value} option={option}/>
                                      )
                                  }}
                            />
                        </ScrollView>
                    )
                }
            }
        </CustomModal>
    )
};

export interface PickerOptionProps {
    option: Option
    selectedValue: any;
}

export const PickerOption = ({option: {text, value: thisValue}, selectedValue}: PickerOptionProps) => {
    return (
        <View style={Styles.getCenterStyles}>
            <Text style={{
                fontWeight: "bold",
                color: StringUtil.sameIds(thisValue, selectedValue) ? Styles.selectedColor : null
            }}>
                {StringUtil.capitalize(text)}
            </Text>
        </View>
    )
};

function getOptionKey(options: SelectOptionModel, value: any) {
    let key = null;
    for (let option in options) {
        if (options[option] === value) {
            key = option;
        }
    }
    return key;
}

export default PickerModal
