import * as React from 'react'
import {ImageStyle, StyleProp, StyleSheet, TouchableWithoutFeedback,} from 'react-native';
import {CheckboxPropsType} from './PropsType';
import Styles from "../styles/Styles";
import ChungView from "../chung-view/ChungView";
import ChungImage from "../chung-image/ChungImage";
import {CustomIcon} from "../custom-icon/CustomIcon";

export interface ICheckboxNativeProps extends CheckboxPropsType {
    style?: StyleProp<ImageStyle>;
}

interface State {
    checked:boolean
}

export default class Checkbox extends React.Component<ICheckboxNativeProps, State> {

    public constructor(props: CheckboxPropsType, context: any) {
        super(props, context);
        this.state = {checked: props.checked};
    }

    public render(): JSX.Element {
        const {style, disabled} = this.props;
        const {checked} = this.state;
        return (
            <TouchableWithoutFeedback onPress={this._handleClick}>
                <ChungView style={[styles.wrapper]}>
                    <CustomIcon name={disabled?"times-circle-o":checked?"check-circle-o":"circle-o"}/>
                </ChungView>
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
