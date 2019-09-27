import * as React from 'react'
import {ImageStyle, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import Label from "./Label";
import Styles from "./Styles";
import {FormCommonProps, FormListItemCommonProps, TestProps} from "./type";
import Checkbox, {CheckboxPublicMethods} from "./CheckBox";
import FormInvalidHint from "./FormInvalidHint";
import {ListItem} from "./index";

export interface OnChangeParams {
    target: {
        checked: boolean;
    };
}

export interface ICheckboxItemNativeProps extends FormCommonProps, FormListItemCommonProps, TestProps {
    checkboxStyle?: StyleProp<ImageStyle>;
    style?: StyleProp<ViewStyle>;
    extra?: React.ReactNode;
    prefixCls?: string;
    onPress?: (e?: any) => void;
    defaultChecked?: boolean;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (params: OnChangeParams) => void;
}

const CheckboxListItem = (props: ICheckboxItemNativeProps) => {
    const refCheckbox = React.createRef<CheckboxPublicMethods>();
    const {
        style,
        checkboxStyle,
        defaultChecked,
        checked,
        disabled,
        label,
        onPress,
        invalidMessage,
        extra,
        listItemProps = {},
        onChange,
        testID,
    } = props;

    return (

        <ListItem
            border
            {...listItemProps}
            bottomExtraView={<FormInvalidHint invalidMessage={invalidMessage}/>}
            style={[style, disabled && {backgroundColor: Styles.disabledBackgroundColor}]}
            onPress={disabled ? undefined : () => {
                refCheckbox.current.onCheck();
                if (onPress) {
                    onPress();
                }
            }}
            extra={
                <Checkbox
                    testID={testID}
                    ref={refCheckbox}
                    style={[styles.checkboxItemCheckbox, checkboxStyle] as any}
                    defaultChecked={defaultChecked}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                />
            }
        >
            <Label style={disabled && {color: Styles.disabledTextColor}}>{label}</Label>
            {extra}
        </ListItem>

    );
};

const styles = StyleSheet.create({
    checkboxItemCheckbox: {
        alignSelf: 'center',
    },
});

export default CheckboxListItem;
