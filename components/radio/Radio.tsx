import React from 'react';
import {Image, ImageStyle, StyleProp, StyleSheet, Text, TouchableWithoutFeedback, View,} from 'react-native';
import {RadioPropsType} from './PropsType';
import {IRadioStyle} from './style/index.native';
import variables from "../style/themes/default.native";

export interface RadioNativeProps extends RadioPropsType {
    styles?: IRadioStyle;
    style?: StyleProp<ImageStyle>;
}

interface State {
    checked:boolean
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
        const { style, disabled,label } = this.props;
        const checked = this.state.checked;
        let imgSrc = undefined as any;
        if (checked) {
            imgSrc = disabled
                ? require('./image/checked_disable.png')
                : require('./image/checked.png');
        }
        return (
            <TouchableWithoutFeedback onPress={this._handleClick}>
                <View style={[styles.wrapper]}>
                    <Image source={imgSrc} style={[styles.icon, style] as any} />
                    {
                        label && <Text>{label}</Text>
                    }
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
        width: variables.icon_size_xxs,
        height: variables.icon_size_xxs * 0.8,
    }
});
