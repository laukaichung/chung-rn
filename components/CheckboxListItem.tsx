import * as React from 'react'
import {RefObject} from 'react'
import {ImageStyle, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import Label from "./Label";
import Styles from "./Styles";
import {FormCommonProps, FormListItemCommonProps} from "./type";
import Checkbox from "./CheckBox";
import FormInvalidHint from "./FormInvalidHint";
import {ListItem} from "./index";

export interface OnChangeParams {
    target: {
        checked: boolean;
    };
}

export interface ICheckboxItemNativeProps extends FormCommonProps, FormListItemCommonProps {
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

export default class CheckboxListItem extends React.Component<ICheckboxItemNativeProps, any> {

    private refCheckbox: RefObject<Checkbox> = React.createRef();

    public render() {
        const {
            style,
            checkboxStyle,
            defaultChecked,
            checked,
            disabled,
            label,
            invalidMessage,
            extra,
            listItemProps = {},
            onChange,
        } = this.props;

        return (

            <ListItem
                {...listItemProps}
                bottomExtraView={<FormInvalidHint invalidMessage={invalidMessage}/>}
                style={[style, disabled && {backgroundColor: Styles.disabledBackgroundColor}]}
                onPress={disabled ? undefined : this._handleClick}
                extra={<Checkbox
                    ref={this.refCheckbox}
                    style={[styles.checkboxItemCheckbox, checkboxStyle] as any}
                    defaultChecked={defaultChecked}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                />}
            >
                <Label style={disabled && {color: Styles.disabledTextColor}}>{label}</Label>
                {extra}
            </ListItem>

        );
    }

    private _handleClick = () => {
        this.refCheckbox.current._handleClick();
        if (this.props.onPress) {
            this.props.onPress();
        }
    }
}

const styles = StyleSheet.create({
    checkboxItemCheckbox: {
        alignSelf: 'center',
    },
});
