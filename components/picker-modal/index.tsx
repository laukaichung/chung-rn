import * as React from 'react'
import {ScrollView, Text, StyleSheet, View} from "react-native";
import Grid from "../grid";
import CustomModal, {ModalProps} from "../modal";
import List from "../list"
import Styles from "../style";
import StringUtil from "../util/StringUtil";
import {HintText} from "../hint-text";
import Label from "../label";
import WhiteSpace from "../white-space";
import {ReactNode} from "react";
import ChungText from "../chung-text";
import ChungView from "../chung-view";

export interface PickerModalProps extends ModalProps {
    data: PickerItem[];
    multiple?: boolean
    label: string,
    hint?: string;
    displayTextAsValue?: boolean;
    columnNum?: number;
    customLabelElement?:ReactNode
    // closeModalAfterOptionSelected?: boolean;
}

interface SelectOptionModel {
    [text: string]: any;
}

interface PickerModalCore extends PickerModalProps {
    onChange: (options: PickerItem[]) => void;
    selectedOptions: PickerItem[];
}

export interface PickerItem {
    text: string,
    value: any
}

export interface PickerOptionProps {
    option: PickerItem
    selectedOptions: PickerItem[];
}

export const PickerOption = ({option, selectedOptions}: PickerOptionProps) => {
    return (
        <View style={Styles.centerItems}>
            <ChungText style={{
                fontWeight: "bold",
                color: selectedOptions.findIndex(o => option.value === o.value) > -1 ? Styles.backgroundColorSelected : null
            }}>
                {StringUtil.capitalize(option.text)}
            </ChungText>
        </View>
    )
};

interface PickerModalState {
    selectedOptions: PickerItem[];
}

export default class PickerModal extends React.Component<PickerModalCore, PickerModalState> {

    public state = {
        selectedOptions: this.props.selectedOptions || []
    };

    public static Option = PickerOption;

    public render() {
        const {props, state} = this;
        let {selectedOptions} = state;
        const {data, multiple, customLabelElement, hint, displayTextAsValue, label, onChange, columnNum = 3} = props;
        let displayValues: string[] = selectedOptions.map(option => {
            return displayTextAsValue ? option.text : option.value
        });

        return (
            <CustomModal
                title={multiple ? `Select multiple options` : `Select one option`}
                {...props}
                buttonTrigger={
                    <List.Item
                        multipleLine
                        arrow="horizontal">
                        {customLabelElement || <Label content={label}/>}
                        {
                            displayValues.length > 0 &&
                            <WhiteSpace>
                                <ChungText>
                                    {displayValues.join(' , ')}
                                </ChungText>
                            </WhiteSpace>
                        }
                    </List.Item>
                }>
                {
                    ({closeModal}) => {
                        return (
                            <ScrollView style={styles.container}>
                                {hint && <HintText content={hint}/>}
                                <Grid columnNum={columnNum}
                                      data={data}
                                      onPress={(option: PickerItem) => {

                                          let targetIdx = selectedOptions.findIndex((o => option.value === o.value))
                                          if (targetIdx > -1) {
                                              selectedOptions.splice(targetIdx, 1);
                                          } else {
                                              if (multiple) {
                                                  selectedOptions.push(option);
                                              } else {
                                                  selectedOptions = [option];
                                              }
                                          }
                                          this.setState({
                                              selectedOptions
                                          });

                                          onChange(selectedOptions);
                                          if (!multiple) closeModal()
                                      }}
                                      renderItem={(option: PickerItem) => {
                                          return (
                                              <PickerOption selectedOptions={selectedOptions} option={option}/>
                                          )
                                      }}
                                />
                            </ScrollView>
                        )
                    }
                }
            </CustomModal>
        )
    }

    public _unSelectAll() {
        this.setState({selectedOptions: []})
    }

    public static _convertModalOptions(data: SelectOptionModel) {
        let list: PickerItem[] = [];
        for (let title in data) {
            list.push({text: title, value: data[title]});
        }
        return list;
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: Styles.padding
    }
})
