import * as React from 'react';
import {
    GestureResponderEvent,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';
import Input from './Input';
import {Styles} from "../style/Styles";
import List from "../list/List";
import {Label} from "../index";

export type InputEventHandler = (value?: string) => void;

export type KeyboardType = 'decimal-pad' | 'phone-pad' | 'number-pad'  | 'numeric' | 'email-address' |'default' |'password' | 'bankCard'

export interface InputItemProps {
    last?: boolean;
    label: string;
    onExtraClick?: (event: GestureResponderEvent) => void;
    onErrorClick?: (event: GestureResponderEvent) => void;
    type?: KeyboardType;
    editable?: boolean;
    disabled?: boolean;
    name?: string;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    clear?: boolean;
    maxLength?: number;
    extra?: React.ReactNode;
    error?: boolean;
    containerStyle?: ViewStyle;
    labelNumber?: number;
    labelPosition?: 'left' | 'top';
    textAlign?: 'left' | 'center';
    updatePlaceholder?: boolean;
    styles?: any;
    locale?: object;
    onChange?: (value: string) => void;
    onFocus?: InputEventHandler;
    onBlur?: InputEventHandler;
    onVirtualKeyboardConfirm?: InputEventHandler;
    disableBorderBottom?:boolean
}

function normalizeValue(value?: string) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}


export default class InputItem extends React.Component<InputItemProps, any> {
    static defaultProps = {
        editable: true,
        clear: false,
        extra: '',
        error: false,
        labelNumber: 4,
        labelPosition: 'left',
        textAlign: 'left',
        last: false,
    };

    inputRef: Input | null;

    render() {
        let {
            type,
            label,
            editable,
            clear,
            error,
            extra,
            onExtraClick,
            onErrorClick,
            disableBorderBottom,
            ...restProps
        } = this.props;
        const {value, defaultValue} = restProps;

        let valueProps;
        if ('value' in this.props) {
            valueProps = {
                value: normalizeValue(value),
            };
        } else {
            valueProps = {
                defaultValue,
            };
        }

        const extraStyle = {
            width:
                typeof extra === 'string' && (extra as string).length > 0
                    ? (extra as string).length * Styles.fontSizeHeading
                    : 0,
        };

        if(type === "bankCard"){
            type = 'number-pad';
        }

        return (
            <List.Item disableBorderBottom={disableBorderBottom}>
                {label && <Label content={label}/>}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Input
                        clearButtonMode={clear ? 'while-editing' : 'never'}
                        underlineColorAndroid="transparent"
                        ref={el => (this.inputRef = el)}
                        {...restProps}
                        {...valueProps}
                        style={[styles.input, error && styles.inputErrorColor]}
                        keyboardType={type}
                        onChange={event => this.onChange(event.nativeEvent.text)}
                        secureTextEntry={type === 'password'}
                        onBlur={this.onInputBlur}
                        onFocus={this.onInputFocus}
                    />
                    {/* 只在有 value 的 受控模式 下展示 自定义的 安卓 clear 按钮 */}
                    {(editable && clear && value && Platform.OS === 'android') ? (
                        <TouchableOpacity
                            style={[styles.clear]}
                            onPress={this.onInputClear}
                            hitSlop={{top: 5, left: 5, bottom: 5, right: 5}}
                        >
                            <Image
                                source={require('../../images/cross_w.png')}
                                style={{width: 12, height: 12}}
                            />
                        </TouchableOpacity>
                    ) : null}
                    {extra ? (
                        <TouchableWithoutFeedback onPress={onExtraClick}>
                            <View>
                                {typeof extra === 'string' ? (
                                    <Text style={[styles.extra, extraStyle]}>{extra}</Text>
                                ) : (
                                    extra
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    ) : null}
                    {error && (
                        <TouchableWithoutFeedback onPress={onErrorClick}>
                            <View style={[styles.errorIconContainer]}>
                                <Image
                                    source={require('../../images/error.png')}
                                    style={styles.errorIcon as any}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                </View>
            </List.Item>
        );
    }

    // expose this method for users;
    focus(){
        if (this.inputRef) {
            this.inputRef.focus();
        }
    }

    onChange = (text: string) => {
        const {onChange, type} = this.props;
        const maxLength = this.props.maxLength as number;
        switch (type) {
            case 'bankCard':
                text = text.replace(/\D/g, '');
                if (maxLength > 0) {
                    text = text.substring(0, maxLength);
                }
                text = text.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
                break;
            case 'phone-pad':
                text = text.replace(/\D/g, '').substring(0, 11);
                const valueLen = text.length;
                if (valueLen > 3 && valueLen < 8) {
                    text = `${text.substr(0, 3)} ${text.substr(3)}`;
                } else if (valueLen >= 8) {
                    text = `${text.substr(0, 3)} ${text.substr(3, 4)} ${text.substr(7)}`;
                }
                break;
            case 'password':
                break;
            default:
                break;
        }
        if (onChange) {
            onChange(text);
        }
    }

    onInputBlur = () => {
        if (this.props.onBlur) {
            this.props.onBlur(this.props.value);
        }
    }

    onInputFocus = () => {
        if (this.props.onFocus) {
            this.props.onFocus(this.props.value);
        }
    }

    onInputClear = () => {
        if (this.inputRef) {
            this.inputRef.clear();
        }
        this.onChange('');
    }

}


const styles = StyleSheet.create({
    text: {
        marginRight: Styles.margin,
        textAlignVertical: 'center',
        fontSize: Styles.fontSizeHeading,
        color: Styles.inputFontColor,
    },
    input: {
        flex: 1,
        height: Styles.listItemHeight,
        backgroundColor: 'transparent',
        fontSize: Styles.inputFontSize,
        color: Styles.inputFontColor,
    },
    inputErrorColor: {
        color: '#f50',
    },
    clear: {
        backgroundColor: Styles.colorIconBase,
        borderRadius: 15,
        padding: 2,
    },
    extra: {
        marginLeft: Styles.marginSm,
        fontSize: Styles.subHeader,
        color: '#888',
    },
    errorIconContainer: {
        marginLeft: Styles.marginSm,
        width: Styles.iconSizeSm,
        height: Styles.iconSizeSm,
    },
    errorIcon: {
        width: Styles.iconSizeSm,
        height: Styles.iconSizeSm,
    }
});
