import * as React from 'react'
import {ReactNode} from 'react'
import {ScrollView, StyleProp, StyleSheet, TextStyle, View} from "react-native";
import Grid, {GridProps} from "./Grid";
import CustomModal, {ModalProps} from "./Modal";
import Styles from "./Styles";
import StringUtil from "./util/StringUtil";
import ChungText from "./ChungText";
import HintText from "./HintText";
import {FormCommonProps, FormListItemCommonProps} from "./type";
import FormHeader from "./FormHeader";
import FormInvalidHint from "./FormInvalidHint";
import {ListItem} from "./index";
import WhiteSpace from "./WhiteSpace";

export interface PickerModalProps extends ModalProps, FormCommonProps, FormListItemCommonProps {
    data: PickerItem[];
    multiple?: boolean
    displayTextAsValue?: boolean;
    gridProps?: GridProps;
    customLabelElement?: ReactNode;
    renderPickerOption?: (data: { selectedOptions: PickerItem[], option: PickerItem }) => ReactNode
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
    textStyle?: StyleProp<TextStyle>
}

export const PickerOption = ({option, textStyle, selectedOptions}: PickerOptionProps) => {
    return (
        <View>
            <ChungText
                style={
                    [
                        {
                            fontWeight: "bold",
                            color: selectedOptions.findIndex(o => option.value === o.value) > -1 ? Styles.selectedTextColor : Styles.textColor,
                            textAlign: "center"
                        },
                        textStyle
                    ]
                }>
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
        const {
            invalidMessage, data, multiple, customLabelElement,
            hint, listItemProps = {}, displayTextAsValue, onChange,
            gridProps,
            renderPickerOption
        } = props;
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
                        arrow="right"
                    >
                        {customLabelElement || <FormHeader {...props} label={props.label}/>}
                        {
                            displayValues.length > 0 &&
                            <ChungText>
                                {displayValues.join(' , ')}
                            </ChungText>
                        }
                    </ListItem>
                }
            >
                {
                    ({closeModal}) => {
                        return (
                            <ScrollView style={styles.container}>
                                {
                                    hint &&
                                    <WhiteSpace>
                                        <HintText>
                                            {hint}
                                        </HintText>
                                    </WhiteSpace>
                                }
                                <WhiteSpace size="lg"/>
                                <Grid
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
                                        if (renderPickerOption) return renderPickerOption({selectedOptions, option});
                                        return (
                                            <PickerOption selectedOptions={selectedOptions} option={option}/>
                                        )
                                    }}
                                    {...gridProps}
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
