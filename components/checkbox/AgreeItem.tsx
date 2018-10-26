import * as React from 'react'
import {ImageStyle, StyleProp, StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle,} from 'react-native';
import Checkbox from './Checkbox';
import {CheckboxPropsType} from './PropsType';
import variables from "../style/themes/default.native";
import {RefObject} from "react";

const refCheckbox = 'checkbox';

export interface AgreeItemNativeProps extends CheckboxPropsType {
    checkboxStyle?: StyleProp<ImageStyle>;
    style?: StyleProp<ViewStyle>;
}


export default class AgreeItem extends React.Component<AgreeItemNativeProps, any> {

    private refCheckbox: RefObject<Checkbox> = React.createRef()

    public render(): JSX.Element {
        let {
            style,
            checkboxStyle,
            children,
            disabled,
            checked,
            defaultChecked,
            onChange,
        } = this.props;

        let contentDom = !children ? null : React.isValidElement(children) ? (
            children
        ) : (
            <Text>{children}</Text>
        );

        return (
            <TouchableWithoutFeedback onPress={this.refCheckbox.current._handleClick}>
                <View style={[styles.agreeItem, style]}>
                    <Checkbox
                        ref={refCheckbox}
                        style={[styles.agreeItemCheckbox, checkboxStyle] as any}
                        disabled={disabled}
                        checked={checked}
                        defaultChecked={defaultChecked}
                        onChange={onChange}
                    />
                    <View style={{flex: 1}}>{contentDom}</View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}


const styles = StyleSheet.create({
    agreeItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    agreeItemCheckbox: {
        marginLeft: variables.h_spacing_lg,
        marginRight: variables.h_spacing_md,
    },
});
