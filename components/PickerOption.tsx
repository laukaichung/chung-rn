import * as React from "react"
import {StyleProp, TextStyle, View} from "react-native";
import {ReactNode} from "react";
import Styles from "./Styles";
import ChungText from "./ChungText";
import StringUtil from "./util/StringUtil";

export interface PickerOptionData {
    text: string,
    value: any
}

export interface PickerOptionProps {
    option: PickerOptionData
    selectedOptions: PickerOptionData[];
    textStyle?: StyleProp<TextStyle>
    extraView?: ReactNode;
}

const PickerOption = ({option, textStyle, extraView, selectedOptions}: PickerOptionProps) => {
    const isSelected = selectedOptions.findIndex(o => option.value === o.value) > -1;
    return (
        <View
            style={{
                padding: Styles.paddingLg,
                flex: 1,
                backgroundColor: isSelected ? Styles.pickerModalSelectedBackgroundColor : null,
                borderBottomColor: Styles.borderColor,
                borderBottomWidth: 1,
            }}
        >
            {extraView}
            <ChungText
                style={
                    [
                        {
                            fontWeight: "bold",
                            color: isSelected ? Styles.pickerModalSelectedFontColor : Styles.fontColor,
                            textAlign: "center"
                        },
                        textStyle
                    ]
                }
            >
                {StringUtil.capitalize(option.text)}
            </ChungText>
        </View>
    )
};

export default PickerOption;