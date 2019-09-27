import * as React from 'react'
import {ImageStyle, StyleProp, StyleSheet, TouchableWithoutFeedback, View,} from 'react-native';
import Styles from "./Styles";
import Icon from "./Icon";
import {OnChangeParams} from "./CheckboxListItem";
import {TestProps} from "./type";
import {forwardRef, RefForwardingComponent, useEffect, useImperativeHandle, useRef, useState} from "react";

export interface ICheckboxNativeProps extends CheckboxProps {
    style?: StyleProp<ImageStyle>;
}

export interface CheckboxProps extends TestProps {
    defaultChecked?: boolean;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (params: OnChangeParams) => void;
}

export interface CheckboxPublicMethods {
    onCheck: () => void;
}


const Checkbox: RefForwardingComponent<CheckboxPublicMethods, ICheckboxNativeProps>  = (props, ref) => {

    const [checked, setChecked] = useState<boolean>();
    const {testID, onChange, disabled} = props;
    useEffect(() => {
        setChecked(props.checked);
    }, [props.checked]);

    const onCheck = () => {
        if (disabled) {
            return;
        }
        let newVal = !checked;
        setChecked(newVal);
        if (onChange) onChange({target: {checked: newVal}});
    };

    useImperativeHandle(ref, () => ({
        onCheck
    }));

    return (
        <TouchableWithoutFeedback testID={testID} onPress={onCheck}>
            <View style={[styles.wrapper]}>
                <Icon name={disabled ? "times-circle-o" : checked ? "check-circle-o" : "circle-o"}/>
            </View>
        </TouchableWithoutFeedback>
    );
};


const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: Styles.iconSizeSm,
        height: Styles.iconSizeSm,
    },
    iconRight: {
        marginLeft: Styles.margin,
    },
    agreeItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    agreeItemCheckbox: {
        marginLeft: Styles.marginLg,
        marginRight: Styles.margin,
    },
    checkboxItemCheckbox: {
        marginRight: Styles.margin,
        alignSelf: 'center',
    },
});

export default forwardRef(Checkbox)