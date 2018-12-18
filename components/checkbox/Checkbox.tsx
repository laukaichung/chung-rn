import * as React from 'react'
import {Image, ImageStyle, StyleProp, StyleSheet, TouchableWithoutFeedback, View,} from 'react-native';
import {CheckboxPropsType} from './PropsType';
import CheckboxListItem from "./CheckboxListItem";
import AgreeItem from "./AgreeItem";
import Styles from "../style";
import ChungView from "../chung-view";
import ChungImage from "../chung-image";

export interface ICheckboxNativeProps extends CheckboxPropsType {
    style?: StyleProp<ImageStyle>;
}

interface State {
    checked:boolean
}

export default class Checkbox extends React.Component<ICheckboxNativeProps, State> {
    static CheckboxItem = CheckboxListItem;
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
                <ChungView style={[styles.wrapper]}>
                    <ChungImage source={imgSrc} style={[styles.icon, style] as any}/>
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
