import React from 'react';
import {
    GestureResponderEvent,
    Image,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    Platform,
    TouchableOpacity, ViewStyle,
} from 'react-native';
import Input from './Input.native';
import {Styles} from "../style/Styles";

export type InputEventHandler = (value?: string) => void;


export interface InputItemProps {
    last?: boolean;
    label?:string;
    onExtraClick?: (event: GestureResponderEvent) => void;
    onErrorClick?: (event: GestureResponderEvent) => void;
    type?:
        | 'text'
        | 'bankCard'
        | 'phone'
        | 'password'
        | 'number'
        | 'digit';
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
}

function normalizeValue(value?: string) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}


export default class InputItem extends React.Component<InputItemProps, any> {
    static defaultProps = {
        type: 'text',
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
            case 'phone':
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

    // this is instance method for user to use
    focus = () => {
        if (this.inputRef) {
            this.inputRef.focus();
        }
    }

    render() {
        const {
            type,
            label,
            children,
            editable,
            clear,
            error,
            extra,
            labelNumber,
            last,
            onExtraClick,
            onErrorClick,
            containerStyle,
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

        const textStyle = {
            width: Styles.header * (labelNumber as number) * 1.05,
        };

        const extraStyle = {
            width:
                typeof extra === 'string' && (extra as string).length > 0
                    ? (extra as string).length *  Styles.header
                    : 0,
        };

        const keyboardTypeArray = [
            'default',
            'email-address',
            'numeric',
            'phone-pad',
            'ascii-capable',
            'numbers-and-punctuation',
            'url',
            'number-pad',
            'name-phone-pad',
            'decimal-pad',
            'twitter',
            'web-search',
        ];

        let keyboardType: any = 'default';

        if (type === 'number') {
            keyboardType = 'numeric';
        } else if (type === 'bankCard') {
            keyboardType = 'number-pad'; // Without float input
        } else if (type === 'phone') {
            keyboardType = 'phone-pad';
        } else if (type && keyboardTypeArray.indexOf(type) > -1) {
            keyboardType = type;
        }

        return (
            <View style={[styles.container, containerStyle]}>
                {label && <Text style={[styles.text, textStyle] as any}>{label}</Text>}
                {
                    children && <View style={textStyle}>{children}</View>
                }
                <Input
                    clearButtonMode={clear ? 'while-editing' : 'never'}
                    underlineColorAndroid="transparent"
                    ref={el => (this.inputRef = el)}
                    {...restProps}
                    {...valueProps}
                    style={[styles.input, error && styles.inputErrorColor]}
                    keyboardType={keyboardType}
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
        );
    }
}


const styles = StyleSheet.create({
    container: {
        height: Styles.listItemHeight + Styles.borderWidth,
        borderBottomWidth: Styles.borderWidth,
        borderBottomColor: Styles.borderColor,
        marginLeft: Styles.margin,
        paddingRight: Styles.padding,
        marginTop: 0,
        marginBottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginRight: Styles.margin,
        textAlignVertical: 'center',
        fontSize: Styles.header,
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
    errorIcon:{
        width: Styles.iconSizeSm,
        height: Styles.iconSizeSm,
    }
});
