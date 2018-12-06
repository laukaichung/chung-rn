import * as React from 'react';
import {ImageStyle, StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {RadioItemPropsType} from './PropsType';
import Radio from "./Radio";
import List from "../list/List";
import {RefObject} from "react";
import Label from "../label";
import {ListItemCommonProps} from "../list/ListItem";
import Styles from "../style";


export interface RadioItemNativeProps extends RadioItemPropsType,ListItemCommonProps {
    style?: StyleProp<ViewStyle>;
    radioStyle?: StyleProp<ImageStyle>;
    label:string;
}

export default class RadioItem extends React.Component<RadioItemNativeProps> {
    private ref: RefObject<Radio>;

    public constructor(props) {
        super(props);
        this.ref = React.createRef<Radio>() as RefObject<Radio>;
    }

    public render() {
        const {style, radioStyle, defaultChecked,disableBorder, checked, label, disabled, onChange} = this.props;
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
                disableBorder={disableBorder}
                listItemStyle={style}
                onPress={disabled ? undefined : this.handleClick}
                extra={radioEl}>
                <Label content={label}/>
            </List.Item>
        );
    }

    private handleClick = () => {
        const radio: RefObject<Radio> = this.ref;
        radio.current._handleClick();
    }
}

const styles = StyleSheet.create({
    radioItemContent: {
        color: Styles.textBaseColor,
        fontSize: Styles.HeaderFontSize,
    },
    radioItemContentDisable: {
        color: Styles.disabledTextColor,
    },
});
