import * as React from 'react';
import {
    Image,
    NativeSyntheticEvent,
    StyleSheet,
    Text,
    TextInput,
    TextInputChangeEventData,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';
import Styles from "../style";
import List from "../list/List";
import Label from "../label";
import {ListItemCommonProps} from "../list/ListItem";

function fixControlledValue(value?: string) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}

export type TextAreaEventHandle = (val?: string) => void;

export interface TextareaItemNativeProps extends ListItemCommonProps{
    last?: boolean;
    label?: string;
    onContentSizeChange?: (e: any) => void;
    containerStyle?: ViewStyle;
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
            containerStyle,
            inputStyle,
            disableBorder,
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
            <List.Item disableBorder={disableBorder}
                       listItemStyle={containerStyle}>
                {label && <Label content={label}/>}
                <TextInput
                    clearButtonMode={clear ? 'while-editing' : 'never'}
                    underlineColorAndroid="transparent"
                    style={[
                        styles.input,
                        {
                            color: error ? '#f50' : Styles.textBaseColor,
                            paddingRight: error ? 2 * Styles.paddingLg : 0,
                        },
                        {height: Math.max(45, height)},
                        inputStyle,
                    ]}
                    {...restProps}
                    {...valueProps}
                    onChange={event => this.onChange(event)}
                    onContentSizeChange={this.onContentSizeChange}
                    multiline={rows! > 1 || autoHeight}
                    numberOfLines={rows}
                    maxLength={maxLength}
                />
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
                {rows! > 1 && count! > 0 && (
                    <View style={[styles!.count]}>
                        <Text>
                            {inputCount} / {count}
                        </Text>
                    </View>
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

        if (onChange) {
            onChange(text);
        }
    };

    onContentSizeChange = (event: {
        nativeEvent: { contentSize: { width: number; height: number } };
    }) => {
        let height;
        const {autoHeight, onContentSizeChange} = this.props;
        const rows = this.props.rows as number;
        if (autoHeight) {
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
    container: {
        borderBottomWidth: Styles.borderWidth,
        borderBottomColor: Styles.borderColor,
    },
    input: {
        backgroundColor: Styles.backgroundColor,
        fontSize: Styles.inputFontSize,
        lineHeight: Math.round(1.3 * Styles.fontSizeHeading),
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
