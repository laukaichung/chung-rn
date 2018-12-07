import * as React from 'react'
import {RefObject} from 'react'
import {ImageStyle, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import Checkbox from './Checkbox';
import {CheckboxItemPropsType} from './PropsType';
import List from "../list/List";
import Label from "../label";
import {ListItemCommonProps} from "../list/ListItem";
import Styles from "../style";
import UIContext from "../ui-provider/UIContext";

export interface ICheckboxItemNativeProps extends CheckboxItemPropsType, ListItemCommonProps {
    checkboxStyle?: StyleProp<ImageStyle>;
    style?: StyleProp<ViewStyle>;
    label: string
}

export default class CheckboxItem extends React.Component<ICheckboxItemNativeProps, any> {
    private refCheckbox: RefObject<Checkbox> = React.createRef();

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
            <UIContext.Consumer>
                {
                    ()=>
                    <List.Item
                        disableBorder={disableBorder}
                        listItemStyle={[style, disabled && {backgroundColor: Styles.disabledBackgroundColor}]}
                        onPress={disabled ? undefined : this._handleClick}
                        extra={<Checkbox
                            ref={this.refCheckbox}
                            style={[styles.checkboxItemCheckbox, checkboxStyle] as any}
                            defaultChecked={defaultChecked}
                            checked={checked}
                            onChange={onChange}
                            disabled={disabled}
                        />}>
                        <Label text={label}/>{extra}
                    </List.Item>
                }
            </UIContext.Consumer>
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
