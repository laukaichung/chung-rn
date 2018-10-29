import * as React from 'react'
import {RefObject} from 'react'
import {ImageStyle, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import Checkbox from './Checkbox';
import {CheckboxItemPropsType} from './PropsType';
import List from "../list/List";
import Label from "../label";
import {ListItemCommonProps} from "../list/ListItem";

export interface ICheckboxItemNativeProps extends CheckboxItemPropsType,ListItemCommonProps {
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
            disableBorder,
            onChange,
        } = this.props;

        return (
            <List.Item
                disableBorder={disableBorder}
                listItemStyle={style}
                onClick={disabled ? undefined : this._handleClick}
                extra={<Checkbox
                    ref={this.refCheckbox}
                    style={[styles.checkboxItemCheckbox, checkboxStyle] as any}
                    defaultChecked={defaultChecked}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                />}>
                <Label content={label}/>{extra}
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
        alignSelf: 'center',
    },
});
