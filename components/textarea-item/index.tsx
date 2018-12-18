import * as React from 'react';
import {
    NativeSyntheticEvent,
    StyleSheet,
    TextInput,
    TextInputChangeEventData,
    TextInputContentSizeChangeEventData,
    TouchableWithoutFeedback,
    ViewStyle,
} from 'react-native';
import Styles from "../style";
import List from "../list/List";
import Label from "../label";
import {ListItemProps} from "../list/ListItem";
import ChungText from "../chung-text";
import ChungView from "../chung-view";
import ChungImage from "../chung-image";

function fixControlledValue(value?: string) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}

export type TextAreaEventHandle = (val?: string) => void;

export interface TextareaItemNativeProps {
    last?: boolean;
    label?: string;
    onContentSizeChange?: (e: any) => void;
    inputStyle?: ViewStyle;
    maxLength?: number;
    name?: string;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    clear?: boolean;
    rows: number;
    count?: number;
    error?: boolean;
    onErrorClick?: () => void;
    autoHeight?: boolean;
    editable?: boolean;
    disabled?: boolean;
    labelNumber?: number;
    onChange?: TextAreaEventHandle;
    onBlur?: TextAreaEventHandle;
    onFocus?: TextAreaEventHandle;
    listItemProps?:ListItemProps
}

interface State {
    inputCount: number;
    height: number
}

export default class TextAreaItem extends React.Component<TextareaItemNativeProps, State> {

    static defaultProps = {
        editable: true
    };

    public constructor(props: TextareaItemNativeProps) {
        super(props);
        this.state = {
            inputCount: 0,
            height:
                props.rows !== undefined && props.rows > 1
                    ? 6 * props.rows * 4
                    : Styles.listItemHeight,
        };
    }

    public render() {
        const {
            rows = 1,
            label,
            error = false,
            clear = true,
            count = 0,
            autoHeight = false,
            onErrorClick,
            inputStyle,
            listItemProps = {},
            placeholder = "Enter here",
            ...restProps
        } = this.props;
        const {value, defaultValue} = restProps;
        const {inputCount,height} = this.state;

        let valueProps;
        if ('value' in this.props) {
            valueProps = {
                value: fixControlledValue(value),
            };
        } else {
            valueProps = {
                defaultValue,
            };
        }

        const maxLength = count! > 0 ? count : undefined;

        return (
            <List.Item multipleLine
                       {...listItemProps}
            >
                {label && <Label marginVertical text={label}/>}
                <TextInput
                    keyboardAppearance={Styles.isDarkMode?"dark":"default"}
                    placeholderTextColor={Styles.placeholderTextColor}
                    placeholder={placeholder}
                    clearButtonMode={clear ? 'while-editing' : 'never'}
                    underlineColorAndroid="transparent"
                    style={[
                        styles.input,
                        {backgroundColor: Styles.extremeBackgroundColor},
                        {
                            color: error ? Styles.errorColor : Styles.textColor,
                            paddingRight: error ? 2 * Styles.paddingLg : 0,
                        },
                        //todo untested
                        {height: Math.max(Styles.inputSingleRowHeight, height)},
                        inputStyle,

                    ]}
                    {...restProps}
                    {...valueProps}
                    onChange={event => this.onChange(event)}
                    onContentSizeChange={this.onContentSizeChange}
                    multiline={rows > 1 || autoHeight}
                    numberOfLines={rows}
                    maxLength={maxLength}
                />
                {error && (
                    <TouchableWithoutFeedback onPress={onErrorClick}>
                        <ChungView style={[styles.errorIconContainer]}>
                            <ChungImage
                                source={require('../../images/error.png')}
                                style={styles.errorIcon as any}
                            />
                        </ChungView>
                    </TouchableWithoutFeedback>
                )}
                {rows! > 1 && count! > 0 && (
                    <ChungView style={[styles!.count]}>
                        <ChungText>
                            {inputCount} / {count}
                        </ChungText>
                    </ChungView>
                )}
            </List.Item>
        );
    }

    onChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const text = event.nativeEvent.text;
        const {onChange} = this.props;

        this.setState({
            inputCount: text.length,
        });

        if (onChange) onChange(text);
    };

    onContentSizeChange = (event:NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {

        let height;
        const {autoHeight, onContentSizeChange} = this.props;
        const {inputCount} = this.state;
        const rows = this.props.rows as number;

        /**
         * If the placeholder string spans a few lines, it is suitable to display the textarea with more than one rows.
         * Use `inputCount` to make autoHeight disabled when the field is empty so the user can read a long placeholder string.
         */
        if (autoHeight && inputCount > 0) {
            height = event.nativeEvent.contentSize.height;

        } else if (rows > 1) {

            height = 6 * rows * 4;
        } else {

            height = Styles.listItemHeight;
        }


        this.setState({height});

        if (onContentSizeChange) {
            onContentSizeChange(event);
        }
    };
}

const styles = StyleSheet.create({
    input: {
        fontSize: Styles.inputFontSize,
        lineHeight: Math.round(1.5 * Styles.headerFontSize),
        textAlignVertical: 'top',
    },
    icon: {
        position: 'absolute',
        top: 8,
        width: Styles.iconSizeMd,
        height: Styles.iconSizeMd,
    },
    errorIconContainer: {
        position: 'absolute',
        right: 18,
        top: 12,
    },
    errorIcon: {
        width: Styles.iconSizeSm,
        height: Styles.iconSizeSm
    },
    count: {
        position: 'absolute',
        right: Styles.padding,
        bottom: Styles.padding,
    },
});
