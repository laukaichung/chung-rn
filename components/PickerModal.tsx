import * as React from 'react'
import {ReactNode} from 'react'
import {ScrollView, StyleSheet, View} from "react-native";
import Grid from "./Grid";
import CustomModal, {ModalProps} from "./Modal";
import Styles from "./Styles";
import StringUtil from "./util/StringUtil";
import ChungText from "./ChungText";
import HintText from "./HintText";
import {FormCommonProps, FormListItemCommonProps} from "./type";
import FormHeader from "./FormHeader";
import FormInvalidHint from "./FormInvalidHint";
import {ListItem} from "./index";

export interface PickerModalProps extends ModalProps, FormCommonProps,FormListItemCommonProps {
    data: PickerItem[];
    multiple?: boolean
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
                color: selectedOptions.findIndex(o => option.value === o.value) > -1 ? "red" : Styles.textColor
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

    public render() {
        const {props, state} = this;
        let {selectedOptions} = state;
        const {invalidMessage,data, multiple, customLabelElement, hint,listItemProps = {}, displayTextAsValue, label, onChange, columnNum = 3} = props;
        let displayValues: string[] = selectedOptions.map(option => {
            return displayTextAsValue ? option.text : option.value
        });

        return (
            <CustomModal
                title={multiple ? `Select multiple options` : `Select one option`}
                {...props}
                buttonTrigger={
                    <ListItem
                        {...listItemProps}
                        bottomExtraView={<FormInvalidHint invalidMessage={invalidMessage}/>}
                        arrow="right">
                        {customLabelElement || <FormHeader {...props}/>}
                        {
                            displayValues.length > 0 &&
                            <React.Fragment>
                                <ChungText>
                                    {displayValues.join(' , ')}
                                </ChungText>
                            </React.Fragment>
                        }
                    </ListItem>
                }>
                {
                    ({closeModal}) => {
                        return (
                            <ScrollView style={styles.container}>
                                {hint && <HintText>{hint}</HintText>}
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
