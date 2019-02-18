import * as React from 'react';
import {
    NativeSyntheticEvent,
    StyleSheet,
    TextInput,
    TextInputChangeEventData,
    TextInputContentSizeChangeEventData,
    View,
    ViewStyle,
} from 'react-native';
import Styles from "./Styles";
import ChungText from "./ChungText";
import {FormCommonProps, FormListItemCommonProps} from "./type";
import FormHeader from "./FormHeader";
import FormInvalidHint from "./FormInvalidHint";
import {ListItem} from "./index";

function fixControlledValue(value?: string) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}

export type TextAreaEventHandle = (val?: string) => void;

export interface TextareaItemNativeProps extends FormListItemCommonProps,FormCommonProps {
    last?: boolean;
    onContentSizeChange?: (e: any) => void;
    inputStyle?: ViewStyle;
    maxLength?: number;
    name?: string;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
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
    onClear?: () => void;
}

interface State {
    inputCount: number;
    height: number
}

export default class TextAreaListItem extends React.Component<TextareaItemNativeProps, State> {

    static defaultProps = {
        editable: true
    };

    public constructor(props: TextareaItemNativeProps) {
        super(props);
        let {value} = props;
        this.state = {
            inputCount: value? value.length: 0,
            height:
                props.rows !== undefined && props.rows > 1
                    ? 6 * props.rows * 4
                    : Styles.listItemHeight,
        };
    }

    public render() {
        const {
            rows = 1,
            error = false,
            count = 0,
            invalidMessage,
            autoHeight = false,
            inputStyle,
            listItemProps = {},
            placeholder = "Enter here",
            ...restProps
        } = this.props;
        const {value, defaultValue} = restProps;
        const {inputCount, height} = this.state;

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
            <ListItem
                {...listItemProps}
                bottomExtraView={(
                    <React.Fragment>
                        {listItemProps.bottomExtraView}
                        <FormInvalidHint invalidMessage={invalidMessage}/>
                    </React.Fragment>
                )}
            >
                <FormHeader {...this.props}/>
                <TextInput
                    keyboardAppearance={Styles.isDarkMode ? "dark" : "default"}
                    placeholderTextColor={Styles.placeholderTextColor}
                    placeholder={placeholder}
                    underlineColorAndroid="transparent"
                    style={[
                        styles.input,
                        {backgroundColor: Styles.extremeBackgroundColor},
                        {
                            color: error ? Styles.errorColor : Styles.fontColor,
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
                {rows! > 1 && count! > 0 && (
                    <View style={[styles!.count]}>
                        <ChungText>
                            {inputCount} / {count}
                        </ChungText>
                    </View>
                )}
            </ListItem>
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

    onContentSizeChange = (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {

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
