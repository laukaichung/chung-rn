import * as React from 'react';
import {ImageStyle, StyleProp, StyleSheet, TouchableWithoutFeedback, View,} from 'react-native';
import Styles from "./Styles";
import Icon from "./Icon";

export interface RadioNativeProps extends RadioPropsType {
    style?: StyleProp<ImageStyle>;
}

interface State {
    checked:boolean
}

export interface RadioPropsType {
    defaultChecked?: boolean;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (e: { target: { checked: boolean } }) => void;
    name?: string;
    wrapLabel?: boolean;
}

export default class Radio extends React.Component<RadioNativeProps, State> {
    public state = {} as State;

    public constructor(props: RadioNativeProps, context: any) {
        super(props, context);
        this.state = {
            checked: props.checked
        };
    }

    public render(): JSX.Element {
        const { style, disabled } = this.props;
        const checked = this.state.checked;
        return (
            <TouchableWithoutFeedback onPress={this._handleClick}>
                <View style={[styles.wrapper]}>
                    <Icon name={checked?"check-circle-o":"circle-o"}/>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    public _handleClick = () => {
        if (this.props.disabled) {
            return;
        }
        let checked = !this.state.checked;
        this.setState({checked});
        if (this.props.onChange) {
            this.props.onChange({ target: { checked } });
        }
    }
}

const styles = StyleSheet.create( {
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: Styles.iconSizeSm,
        height: Styles.iconSizeSm * 0.8,
    }
});
