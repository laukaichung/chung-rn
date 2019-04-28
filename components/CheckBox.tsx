import * as React from 'react'
import {ImageStyle, StyleProp, StyleSheet, TouchableWithoutFeedback, View,} from 'react-native';
import Styles from "./Styles";
import Icon from "./Icon";
import {OnChangeParams} from "./CheckboxListItem";
import {TestProps} from "./type";

export interface ICheckboxNativeProps extends CheckboxProps {
    style?: StyleProp<ImageStyle>;
}

export interface CheckboxProps extends TestProps{
    defaultChecked?: boolean;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (params: OnChangeParams) => void;
}

interface State {
    checked:boolean
}

export default class Checkbox extends React.Component<ICheckboxNativeProps, State> {

    public constructor(props: CheckboxProps, context: any) {
        super(props, context);
        this.state = {checked: props.checked};
    }

    public render(): JSX.Element {
        const {testID, disabled} = this.props;
        const {checked} = this.state;
        return (
            <TouchableWithoutFeedback testID={testID} onPress={this._handleClick}>
                <View style={[styles.wrapper]}>
                    <Icon name={disabled?"times-circle-o":checked?"check-circle-o":"circle-o"}/>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    componentWillReceiveProps(nextProps: CheckboxProps): void {
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
        width: Styles.iconSizeSm,
        height: Styles.iconSizeSm,
    },
    iconRight: {
        marginLeft: Styles.margin,
    },
    agreeItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    agreeItemCheckbox: {
        marginLeft: Styles.marginLg,
        marginRight: Styles.margin,
    },
    checkboxItemCheckbox: {
        marginRight: Styles.margin,
        alignSelf: 'center',
    },
});
