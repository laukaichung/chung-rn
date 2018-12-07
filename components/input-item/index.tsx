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
    ViewStyle,
} from 'react-native';
import Input from './Input';
import Styles from "../style";
import List from "../list/List";
import Label from "../label";
import {ListItemCommonProps} from "../list/ListItem";
import UIContext from "../ui-provider/UIContext";
import ChungText from "../chung-text";

type InputEventHandler = (value?: string) => void;

export type KeyboardType =
    'decimal-pad'
    | 'phone-pad'
    | 'number-pad'
    | 'numeric'
    | 'email-address'
    | 'default'
    | 'password'
    | 'bankCard'


export interface InputItemProps extends ListItemCommonProps {
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
    extra?: ReactNode;
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
    autoFocus?: boolean
}

function normalizeValue(value?: string) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}


export default class InputItem extends React.Component<InputItemProps, any> {
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
            disableBorder,
            label,
            editable,
            clear,
            error,
            extra,
            onExtraClick,
            onErrorClick,
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
            width: typeof extra === 'string' && (extra as string).length > 0 ? (extra as string).length * 10 : 0,
        };

        if (type === "bankCard") {
            type = 'number-pad';
        }

        return (
            <UIContext.Consumer>
                {
                    () =>
                        <List.Item multipleLine disableBorder={disableBorder}>
                            {
                                label && <Label marginVertical text={label}/>
                            }
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
                                        {color: Styles.textColor, backgroundColor: Styles.darkestBackgroundColor},
                                        error && Styles.errorColor]}
                                    keyboardType={type}
                                    onChange={event => this._onChange(event.nativeEvent.text)}
                                    secureTextEntry={type === 'password'}
                                    onBlur={this._onInputBlur}
                                    onFocus={this._onInputFocus}
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
                                {error ? (
                                    <TouchableWithoutFeedback onPress={onErrorClick}>
                                        <View style={[styles.errorIconContainer]}>
                                            <Image
                                                source={require('../../images/error.png')}
                                                style={styles.errorIcon as any}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                ) : null}
                            </View>
                        </List.Item>
                }
            </UIContext.Consumer>
        );
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


const styles = StyleSheet.create({
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
