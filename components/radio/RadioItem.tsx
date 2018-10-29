import * as React from 'react';
import {ImageStyle, StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {RadioItemPropsType} from './PropsType';
import Radio from "./Radio";
import List from "../list/List";
import variables from "../style/themes/default.native";
import {RefObject} from "react";
import Label from "../label";
import {ListItemCommonProps} from "../list/ListItem";


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
                onClick={disabled ? undefined : this.handleClick}
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
        color: variables.color_text_base,
        fontSize: variables.font_size_heading,
    },
    radioItemContentDisable: {
        color: variables.color_text_disabled,
    },
});
