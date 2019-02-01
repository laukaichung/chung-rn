import * as React from 'react';
import {RefObject} from 'react';
import {ImageStyle, StyleProp, ViewStyle} from 'react-native';
import Radio, {RadioPropsType} from "./Radio";
import Label from "./Label";
import Styles from "./Styles";
import {FormCommonProps, FormListItemCommonProps} from "./type";
import FormInvalidHint from "./FormInvalidHint";
import {ListItem} from "./index";

export interface RadioItemPropsType extends RadioPropsType {
    radioProps?: object;
    onPress?: () => any;
}

export interface RadioItemNativeProps extends RadioItemPropsType,FormCommonProps, FormListItemCommonProps {
    style?: StyleProp<ViewStyle>;
    radioStyle?: StyleProp<ImageStyle>;
}

export default class RadioListItem extends React.Component<RadioItemNativeProps> {
    private ref: RefObject<Radio>;

    public constructor(props) {
        super(props);
        this.ref = React.createRef<Radio>() as RefObject<Radio>;
    }

    public render() {
        const {style, radioStyle, defaultChecked, checked,listItemProps = {},invalidMessage, label, disabled, onChange} = this.props;
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
            <ListItem
                {...listItemProps}
                bottomExtraView={<FormInvalidHint invalidMessage={invalidMessage}/>}
                style={[style, disabled && {backgroundColor: Styles.disabledBackgroundColor}]}
                onPress={disabled ? undefined : this.handleClick}
                extra={radioEl}>
                <Label style={disabled && {color:Styles.disabledTextColor}}>
                    {label}
                </Label>
            </ListItem>

        );
    }

    private handleClick = () => {
        const radio: RefObject<Radio> = this.ref;
        radio.current._handleClick();
    }
}

