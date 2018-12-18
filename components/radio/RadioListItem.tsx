import * as React from 'react';
import {RefObject} from 'react';
import {ImageStyle, StyleProp, ViewStyle} from 'react-native';
import {RadioItemPropsType} from './PropsType';
import Radio from "./Radio";
import List from "../list/List";
import Label from "../label";
import Styles from "../style";
import {FormListItemCommonProps} from "../type";

export interface RadioItemNativeProps extends RadioItemPropsType, FormListItemCommonProps {
    style?: StyleProp<ViewStyle>;
    radioStyle?: StyleProp<ImageStyle>;
    label: string;
}

export default class RadioListItem extends React.Component<RadioItemNativeProps> {
    private ref: RefObject<Radio>;

    public constructor(props) {
        super(props);
        this.ref = React.createRef<Radio>() as RefObject<Radio>;
    }

    public render() {
        const {style, radioStyle, defaultChecked, checked,listItemProps = {}, label, disabled, onChange} = this.props;
        const radioEl = (
            <Radio
                ref={this.ref}
                style={radioStyle}
                defaultChecked={defaultChecked}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
        );

        return (
            <List.Item
                {...listItemProps}
                style={[style, disabled && {backgroundColor: Styles.disabledBackgroundColor}]}
                onPress={disabled ? undefined : this.handleClick}
                extra={radioEl}>
                <Label style={disabled && {color:Styles.disabledTextColor}} text={label}/>
            </List.Item>

        );
    }

    private handleClick = () => {
        const radio: RefObject<Radio> = this.ref;
        radio.current._handleClick();
    }
}
