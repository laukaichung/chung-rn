import * as React from 'react'
import {RefObject} from 'react'
import {ImageStyle, StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle,} from 'react-native';
import Checkbox, {CheckboxProps} from './CheckBox';
import Styles from "./Styles";
import ChungText from "./ChungText";

const refCheckbox = 'checkbox';

export interface AgreeItemNativeProps extends CheckboxProps {
    checkboxStyle?: StyleProp<ImageStyle>;
    style?: StyleProp<ViewStyle>;
}

export default class CheckBoxAgreeItem extends React.Component<AgreeItemNativeProps, any> {
    private refCheckbox: RefObject<Checkbox> = React.createRef();
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
            <ChungText>{children}</ChungText>
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
        marginLeft: Styles.marginLg,
        marginRight: Styles.margin,
    },
});
