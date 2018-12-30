import * as React from 'react';
import {ReactNode, RefObject} from 'react';
import {
    GestureResponderEvent,
    Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Input from './Input';
import Styles from "../styles/Styles";
import List from "../list/List";
import ChungText from "../chung-text/ChungText";
import {FormCommonProps, FormListItemCommonProps} from "../type";
import FormHeader from "../form-header/FormHeader";


type InputEventHandler = (value?: string) => void;

export type KeyboardType =
    'decimal-pad'
    | 'phone-pad'
    | 'numeric'
    | 'email-address'
    | 'default'
    | 'password'


export interface InputItemProps extends FormCommonProps,FormListItemCommonProps {
    last?: boolean;
    onExtraClick?: () => void;
    onErrorClick?: () => void;
    type?: KeyboardType;
    editable?: boolean;
    disabled?: boolean;
    name?: string;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    clear?: boolean;
    maxLength?: number;
    extra?: ReactNode;
    error?: boolean;
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
    autoFocus?: boolean;
}

function normalizeValue(value?: string) {

    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}


export default class InputListItem extends React.Component<InputItemProps, any> {
    public static defaultProps = {
        editable: true,
        clear: false,
        extra: '',
        error: false,
        labelNumber: 4,
        labelPosition: 'left',
        textAlign: 'left',
        last: false,
    };

    private inputRef: RefObject<Input> = React.createRef();

    public render() {
        let {
            type,
            label,
            editable,
            clear,
            error,
            hint,
            extra,
            onExtraClick,
            onErrorClick,
            listItemProps = {},
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
        let inputType = type;
        if (type === "decimal-pad") {
            inputType = "numeric"
        }

        const extraStyle = {
            width: typeof extra === 'string' && (extra as string).length > 0 ? (extra as string).length * 10 : 0,
        };

        return (

            <List.Item multipleLine {...listItemProps}>

                <FormHeader {...this.props}/>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Input
                        placeholderTextColor={Styles.placeholderTextColor}
                        clearButtonMode={clear ? 'while-editing' : 'never'}
                        underlineColorAndroid="transparent"
                        ref={this.inputRef}
                        {...restProps}
                        {...valueProps}
                        style={[
                            styles.input,
                            {
                                color: Styles.textColor,
                                backgroundColor: Styles.extremeBackgroundColor,
                                height: Styles.inputSingleRowHeight,
                            },
                            error && Styles.errorColor]}
                        keyboardType={type}
                        onChange={event => this._onChange(event.nativeEvent.text)}
                        secureTextEntry={type === 'password'}
                        onBlur={this._onInputBlur}
                        onFocus={this._onInputFocus}
                        type={inputType}
                    />
                    {(editable && clear && value && Platform.OS === 'android') ? (
                        <TouchableOpacity
                            style={[styles.clear]}
                            onPress={this._onInputClear}
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
                                    <ChungText style={[styles.extra, extraStyle]}>{extra}</ChungText>
                                ) : (
                                    extra
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    ) : null}
                </View>
            </List.Item>
        )

    }

    public componentDidMount() {
        if (this.props.autoFocus)
            this._focus();
    }

    // expose this method for users;
    public _focus() {
        if (this.inputRef.current) {
            this.inputRef.current.focus();
        }
    }

    private _onChange = (text: string) => {
        const {onChange, type} = this.props;
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
    }

    private _onInputBlur = () => {
        if (this.props.onBlur) {
            this.props.onBlur(this.props.value);
        }
    }

    private _onInputFocus = () => {
        if (this.props.onFocus) {
            this.props.onFocus(this.props.value);
        }
    }

    private _onInputClear = () => {
        if (this.inputRef.current) {
            this.inputRef.current.clear();
        }
        this._onChange('');
    }

}


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
        fontSize: Styles.subheaderFontSize,
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
