import * as React from "react"
import {StyleProp, TextStyle, View} from "react-native";
import {ReactNode} from "react";
import Styles from "./Styles";
import ChungText from "./ChungText";
import StringUtil from "./util/StringUtil";
import {TestProps} from "./type";

export interface PickerOptionData {
    text: string,
    value: any
}

export interface PickerOptionProps extends TestProps{
    option: PickerOptionData
    selectedOptions: PickerOptionData[];
    textStyle?: StyleProp<TextStyle>
    extraView?: ReactNode;
}

const PickerOption = ({option, textStyle, extraView, testID, selectedOptions}: PickerOptionProps) => {
    const isSelected = selectedOptions.findIndex(o => option.value === o.value) > -1;
    return (
        <View
            testID={testID}
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