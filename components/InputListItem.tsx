import * as React from 'react';
import {ReactNode, useEffect, useRef} from 'react';
import {StyleSheet, TextInputProps, TouchableWithoutFeedback, View,} from 'react-native';
import Input, {InputPublicMethods} from './Input';
import Styles from "./Styles";
import ChungText from "./ChungText";
import {FormCommonProps, FormListItemCommonProps, Omit, TestProps} from "./type";
import FormHeader, {FormHeaderProps} from "./FormHeader";
import FormInvalidHint from "./FormInvalidHint";
import {ListItem} from "./index";

export type KeyboardType =
    'decimal-pad'
    | 'phone-pad'
    | 'numeric'
    | 'email-address'
    | 'default'
    | 'password'


export interface InputItemProps extends Omit<TextInputProps, "value" | "onChange">, FormCommonProps, FormListItemCommonProps, FormHeaderProps, TestProps {
    onExtraClick?: () => void;
    onErrorClick?: () => void;
    type?: KeyboardType;
    editable?: boolean;
    disabled?: boolean;
    name?: string;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    maxLength?: number;
    extra?: ReactNode;
    error?: boolean;
    updatePlaceholder?: boolean;
    styles?: any;
    locale?: object;
    onChange?: (value: string) => void;
    onEnter?: () => void;
    autoFocus?: boolean;
}

function normalizeValue(value?: string) {

    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}


const InputListItem = (props: InputItemProps) => {
    const {
        editable = true,
        error = false,
        type,
        extra,
        value,
        defaultValue,
        onChange,
        invalidMessage,
        autoFocus,
        onExtraClick,
        listItemProps = {},
        onEnter,
        onKeyPress,
    } = props;
    const inputRef = useRef<InputPublicMethods>();
    const _focus = ()=>{
        if (inputRef.current) {
            inputRef.current.textInputRef.current.focus();
        }
    };

    useEffect(() => {
        if (autoFocus) {
            _focus();
        }
    });

    const _onChange = (text: string) => {
        switch (type) {
            case 'phone-pad':
                text = text.replace(/\D/g, '').substring(0, 11);
                const valueLen = text.length;
                if (valueLen > 3 && valueLen < 8) {
                    text = `${text.substr(0, 3)} ${text.substr(3)}`;
                } else if (valueLen >= 8) {
                    text = `${text.substr(0, 3)} ${text.substr(3, 4)} ${text.substr(7)}`;
                }
                break;
            case 'numeric':
                text = parseInt(text) as any;
                break;
            case 'decimal-pad':
                /**
                 * Only turn the value to int if the end isn't "."
                 * If the value ends with ".",
                 * this value is either invalid and incomplete. If you parseFloat this incomplete value, it would strip away the dot.
                 */
                if (text && text[text.length - 1] !== ".") {
                    text = parseNumber(text) as any;
                }
                break;
            default:
                break;
        }
        if (onChange) {
            onChange(text);
        }
    };

    let valueProps;
    if ('value' in props) {
        valueProps = {
            value: normalizeValue(value),
        };
    } else {
        valueProps = {
            defaultValue,
        };
    }

    let inputType = type;

    if (type === "decimal-pad") {
        inputType = "numeric"
    }

    const extraStyle = {
        width: typeof extra === 'string' && (extra as string).length > 0 ? (extra as string).length * 10 : 0,
    };

    return (
        <ListItem
            border
            {...listItemProps}
            bottomExtraView={
                <React.Fragment>
                    {listItemProps.bottomExtraView}
                    <FormInvalidHint invalidMessage={invalidMessage}/>
                </React.Fragment>
            }
        >
            <FormHeader {...props}/>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Input
                    placeholderTextColor={Styles.placeholderTextColor}
                    underlineColorAndroid="transparent"
                    ref={inputRef}
                    editable={editable}
                    {...props}
                    {...valueProps}
                    style={[
                        styles.input,
                        {
                            color: Styles.fontColor,
                            backgroundColor: Styles.extremeBackgroundColor,
                            height: Styles.inputSingleRowHeight,
                        },
                        error && Styles.errorColor]}
                    keyboardType={type}
                    onChange={event => _onChange(event.nativeEvent.text)}
                    secureTextEntry={type === 'password'}
                    type={inputType}
                    onKeyPress={(e) => {
                        if (e.nativeEvent.key === "Enter" && onEnter) {
                            onEnter();
                        } else if (onKeyPress) {
                            onKeyPress(e);
                        }
                    }}
                />
                {extra ? (
                    <TouchableWithoutFeedback onPress={onExtraClick}>
                        <View>
                            {typeof extra === 'string' ? (
                                <ChungText style={[styles.extra, extraStyle]}>{extra}</ChungText>
                            ) : (
                                extra
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                ) : null}
            </View>
        </ListItem>
    )
};


function parseNumber(str: any): number {
    str = String(str);
    if (str.indexOf('.') > -1) {
        return parseFloat(str);
    } else {
        return parseInt(str);
    }
}

const styles = StyleSheet.create({
    label: {
        marginBottom: Styles.margin
    },
    text: {
        marginRight: Styles.margin,
        textAlignVertical: 'center',
        fontSize: Styles.headerFontSize,
        color: Styles.inputFontColor,
    },
    input: {
        flex: 1,
        backgroundColor: 'transparent',
        fontSize: Styles.inputFontSize,
    },
    clear: {
        backgroundColor: Styles.indicatorColor,
        borderRadius: 15,
        padding: 2,
    },
    extra: {
        marginLeft: Styles.marginSm,
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

export default InputListItem;