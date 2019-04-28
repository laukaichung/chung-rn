import * as React from 'react'
import {ReactNode} from 'react'
import {FlatList, TouchableOpacity} from "react-native";
import CustomModal, {ModalProps} from "./Modal";
import ChungText from "./ChungText";
import HintText from "./HintText";
import {FormCommonProps, FormListItemCommonProps, TestProps} from "./type";
import FormHeader, {FormHeaderProps} from "./FormHeader";
import FormInvalidHint from "./FormInvalidHint";
import {ListItem} from "./index";
import WhiteSpace from "./WhiteSpace";
import Header from "./Header";
import PickerOption, {PickerOptionData, PickerOptionProps} from "./PickerOption";
import WingBlank from "./WingBlank";

export interface PickerModalProps extends ModalProps, FormCommonProps, FormListItemCommonProps, FormHeaderProps {
    data: PickerOptionData[];
    multiple?: boolean
    displayTextAsValue?: boolean;
    labelView?: ReactNode;
    pickerOptionProps?: Partial<PickerOptionProps>
    renderPickerOption?: (data: { selectedOptions: PickerOptionData[], option: PickerOptionData }) => ReactNode
    modalListTestID?: string;
    modalListItemTestID?: string;
}

interface SelectOptionModel {
    [text: string]: any;
}

interface PickerModalCore extends PickerModalProps {
    onChange: (options: PickerOptionData[]) => void;
    selectedOptions: PickerOptionData[];
}

interface PickerModalState {
    selectedOptions: PickerOptionData[];
}

export default class PickerModal extends React.Component<PickerModalCore, PickerModalState> {

    public state = {
        selectedOptions: this.props.selectedOptions || []
    };

    public render() {
        const {props, state} = this;
        let {selectedOptions} = state;
        const {
            invalidMessage, data, multiple, labelView,
            hint, listItemProps = {}, displayTextAsValue, onChange,
            renderPickerOption, pickerOptionProps,
            modalListTestID, modalListItemTestID,
        } = props;
        let displayValues: string[] = selectedOptions.map(option => {
            return displayTextAsValue ? option.text : option.value
        });

        return (
            <CustomModal
                {...props}
                buttonTrigger={
                    <ListItem
                        border
                        {...listItemProps}
                        bottomExtraView={<FormInvalidHint invalidMessage={invalidMessage}/>}
                        arrow="right"
                    >
                        {labelView || <FormHeader {...props} label={props.label}/>}
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
                                <FlatList
                                    testID={modalListTestID}
                                    ListHeaderComponent={(
                                        <WingBlank marginVertical>
                                            <Header>
                                                {multiple ? `Select multiple options` : `Select one option`}
                                            </Header>
                                            {
                                                hint &&
                                                <WhiteSpace>
                                                    <HintText>
                                                        {hint}
                                                    </HintText>
                                                </WhiteSpace>
                                            }
                                        </WingBlank>
                                    )}
                                    data={data}
                                    keyExtractor={(item, index) => String(index)}
                                    renderItem={({item: option}: { item: PickerOptionData }) => {
                                        return (
                                            <TouchableOpacity
                                                testID={modalListItemTestID}
                                                onPress={() => {
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
                                            >
                                                {
                                                    renderPickerOption ?
                                                        renderPickerOption({selectedOptions, option})
                                                        :
                                                        <PickerOption
                                                            {...pickerOptionProps}
                                                            selectedOptions={selectedOptions}
                                                            option={option}
                                                        />
                                                }
                                            </TouchableOpacity>
                                        )
                                    }}
                                />
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
        let list: PickerOptionData[] = [];
        for (let title in data) {
            list.push({text: title, value: data[title]});
        }
        return list;
    }
}

