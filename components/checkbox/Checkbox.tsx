import * as React from 'react'
import {Image, ImageStyle, StyleProp, StyleSheet, TouchableWithoutFeedback, View,} from 'react-native';

import {CheckboxPropsType} from './PropsType';
import variables from "../style/themes/default.native";
import CheckboxItem from "./CheckboxItem";
import AgreeItem from "./AgreeItem";

export interface ICheckboxNativeProps extends CheckboxPropsType {
    style?: StyleProp<ImageStyle>;
}

interface State {
    checked:boolean
}

export default class Checkbox extends React.Component<ICheckboxNativeProps, State> {
    static CheckboxItem = CheckboxItem;
    static AgreeItem =  AgreeItem;

    public constructor(props: CheckboxPropsType, context: any) {
        super(props, context);
        this.state = {checked: props.checked};
    }

    public render(): JSX.Element {
        const {style, disabled} = this.props;
        const {checked} = this.state;
        let imgSrc;
        if (checked) {
            imgSrc = disabled
                ? require('../../images/checkbox-images/checked_disable.png')
                : require('../../images/checkbox-images/checked.png');
        } else {
            imgSrc = disabled
                ? require('../../images/checkbox-images/normal_disable.png')
                : require('../../images/checkbox-images/normal.png');
        }

        return (
            <TouchableWithoutFeedback onPress={this._handleClick}>
                <View style={[styles.wrapper]}>
                    <Image source={imgSrc} style={[styles.icon, style] as any}/>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    componentWillReceiveProps(nextProps: CheckboxPropsType): void {
        if (typeof nextProps.checked === 'boolean') {
            this.setState({
                checked: !!nextProps.checked,
            });
        }
    }

    public _handleClick = () => {
        if (this.props.disabled) {
            return;
        }
        let checked = !this.state.checked;
        this.setState({checked});
        if (this.props.onChange) this.props.onChange({target: {checked}});

    }


}


const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: variables.icon_size_sm,
        height: variables.icon_size_sm,
    },
    iconRight: {
        marginLeft: variables.h_spacing_md,
    },
    agreeItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    agreeItemCheckbox: {
        marginLeft: variables.h_spacing_lg,
        marginRight: variables.h_spacing_md,
    },
    checkboxItemCheckbox: {
        marginRight: variables.h_spacing_md,
        alignSelf: 'center',
    },
});
