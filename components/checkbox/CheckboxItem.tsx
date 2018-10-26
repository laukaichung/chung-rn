import * as React from 'react'
import {ImageStyle, StyleProp,Text, StyleSheet, ViewStyle} from 'react-native';
import Checkbox from './Checkbox';
import {CheckboxItemPropsType} from './PropsType';
import List from "../list/List";
import variables from "../style/themes/default.native";
import {RefObject} from "react";

export interface ICheckboxItemNativeProps extends CheckboxItemPropsType {
    checkboxStyle?: StyleProp<ImageStyle>;
    style?: StyleProp<ViewStyle>;
    label:string
}

export default class CheckboxItem extends React.Component<ICheckboxItemNativeProps, any> {
    private refCheckbox:RefObject<Checkbox> = React.createRef();

    public render() {
        const {
            style,
            checkboxStyle,
            defaultChecked,
            checked,
            disabled,
            label,
            extra,
            onChange,
        } = this.props;

        return (
            <List.Item
                listItemStyle={style}
                onClick={disabled ? undefined : this._handleClick}
                extra={extra}
                thumb={(
                    <Checkbox
                        ref={this.refCheckbox}
                        style={[styles.checkboxItemCheckbox, checkboxStyle] as any}
                        defaultChecked={defaultChecked}
                        checked={checked}
                        onChange={onChange}
                        disabled={disabled}
                    />
                )}>
                <Text>{label}</Text>
            </List.Item>
        );
    }

    private _handleClick = () => {
        this.refCheckbox.current._handleClick();
        if (this.props.onClick) {
            this.props.onClick();
        }
    }
}

const styles = StyleSheet.create({
    checkboxItemCheckbox: {
        marginRight: variables.h_spacing_md,
        alignSelf: 'center',
    },
});
