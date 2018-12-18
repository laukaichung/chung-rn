import * as React from 'react'
import {ReactNode} from 'react'
import {ScrollView, StyleSheet, View} from "react-native";
import Grid from "../grid";
import CustomModal, {ModalProps} from "../modal";
import List from "../list"
import Styles from "../style";
import StringUtil from "../util/StringUtil";
import Label from "../label";
import WhiteSpace from "../white-space";
import ChungText from "../chung-text";
import HintText from "../hint-text";
import {FormListItemCommonProps} from "../type";

export interface PickerModalProps extends ModalProps, FormListItemCommonProps {
    data: PickerItem[];
    multiple?: boolean
    label: string,
    hint?: string;
    displayTextAsValue?: boolean;
    columnNum?: number;
    customLabelElement?: ReactNode
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
                color: selectedOptions.findIndex(o => option.value === o.value) > -1 ? Styles.selectedBackgroundColor : Styles.textColor
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
        const {data, multiple, customLabelElement, hint,listItemProps = {}, displayTextAsValue, label, onChange, columnNum = 3} = props;
        let displayValues: string[] = selectedOptions.map(option => {
            return displayTextAsValue ? option.text : option.value
        });

        return (
            <CustomModal
                title={multiple ? `Select multiple options` : `Select one option`}
                {...props}
                buttonTrigger={
                    <List.Item
                        {...listItemProps}
                        multipleLine
                        arrow="horizontal">
                        {customLabelElement || <Label text={label}/>}
                        {
                            displayValues.length > 0 &&
                            <React.Fragment>
                                <WhiteSpace/>
                                <ChungText>
                                    {displayValues.join(' , ')}
                                </ChungText>
                            </React.Fragment>
                        }
                    </List.Item>
                }>
                {
                    ({closeModal}) => {
                        return (
                            <ScrollView style={styles.container}>
                                {hint && <HintText text={hint}/>}
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
