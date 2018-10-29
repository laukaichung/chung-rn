import * as React from 'react';
import {Image, StyleProp, StyleSheet, Text, View, ViewStyle,} from 'react-native';
import Styles from "../style";
import {CustomTouchableHighlight} from "../custom-touchable-highlight";
import {ReactNode} from "react";

export interface ListItemCommonProps {
    disableBorder?: "bottom"|"top"|"all"|"preserve";
}

export interface ListItemProps extends ListItemCommonProps{
    align?: 'top' | 'middle' | 'bottom';
    disabled?: boolean;
    multipleLine?: boolean;
    children?: ReactNode;
    thumb?: ReactNode | null;
    extra?: ReactNode;
    arrow?: 'horizontal' | 'down' | 'up' | 'empty' | '';
    wrap?: boolean;
    activeStyle?: React.CSSProperties;
    error?: boolean;
    platform?: 'android' | 'ios';
    onClick?: () => void;
    onLongPress?: () => void;
    onPressIn?: () => void;
    onPressOut?: () => void;
    listItemStyle?: StyleProp<ViewStyle>;
}


export default class Item extends React.Component<ListItemProps, any> {

    render() {
        const {
            children,
            onLongPress,
            multipleLine,
            thumb,
            extra,
            arrow,
            onClick,
            onPressIn,
            onPressOut,
            disableBorder,
            wrap,
            align,
            listItemStyle,
            ...restProps
        } = this.props;

        let numberOfLines = {};
        if (!wrap) {
            numberOfLines = {
                numberOfLines: 1,
            };
        }

        let alignStyle = {};

        if (align === 'top') {
            alignStyle = {
                alignItems: 'flex-start',
            };
        } else if (align === 'bottom') {
            alignStyle = {
                alignItems: 'flex-end',
            };
        }

        let contentDom;

        if (Array.isArray(children)) {

            contentDom = <View style={[styles.column]}>{children}</View>;

        } else {

            if (children && React.isValidElement(children)) {
                contentDom = <View style={[styles.column]}>{children}</View>;
            } else {
                contentDom = (
                    <View style={[styles.column]}>
                        <Text style={[styles.content]} {...numberOfLines}>
                            {children}
                        </Text>
                    </View>
                );
            }
        }

        let extraDom;
        if (extra) {
            extraDom = (
                <View style={[styles.column]}>
                    <Text style={[styles.extra]} {...numberOfLines}>
                        {extra}
                    </Text>
                </View>
            );
            if (React.isValidElement(extra)) {
                const extraChildren = (extra.props as any).children;
                if (Array.isArray(extraChildren)) {
                    const tempExtraDom: any[] = [];
                    extraChildren.forEach((el, index) => {
                        if (typeof el === 'string') {
                            tempExtraDom.push(
                                <Text
                                    {...numberOfLines}
                                    style={[styles.extra]}
                                    key={`${index}-children`}
                                >
                                    {el}
                                </Text>,
                            );
                        } else {
                            tempExtraDom.push(el);
                        }
                    });
                    extraDom = <View style={[styles.column]}>{tempExtraDom}</View>;
                } else {
                    extraDom = extra;
                }
            }
        }

        let itemBorderStyle:StyleProp<ViewStyle> = {};
        if(disableBorder === "bottom"){
            itemBorderStyle = {borderBottomWidth:0}
        }else if(disableBorder === "top"){
            itemBorderStyle = {borderTopWidth:0}
        }else if(disableBorder === "all"){
            itemBorderStyle = {borderWidth:0}
        }

        const itemView = (
            <View {...restProps} style={[styles.item, listItemStyle]}>
                {typeof thumb === 'string' ? (
                    <Image
                        source={{uri: thumb}}
                        style={[styles.thumb, multipleLine && styles.multipleThumb] as any}
                    />
                ) : (
                    thumb
                )}
                <View
                    style={[
                        styles.line,
                        multipleLine && styles.multipleLine,
                        multipleLine && alignStyle,
                        itemBorderStyle,
                    ]}
                >
                    {contentDom}
                    {extraDom}
                    {arrow
                        ? (arrEnum as any)[arrow] || <View style={styles.arrow}/>
                        : null}
                </View>
            </View>
        );

        return (
            <CustomTouchableHighlight
                onPress={onClick}
                onLongPress={onLongPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                {itemView}
            </CustomTouchableHighlight>
        );
    }
}


const arrEnum = {
    horizontal: (
        <Image
            source={require('../../images/arrow.png')}
        />
    ),
    down: (
        <Image
            source={require('../../images/arrow-down.png')}
        />
    ),
    up: (
        <Image
            source={require('../../images/arrow-up.png')}
        />
    ),
};

const styles = StyleSheet.create({
    underlayColor: {
        backgroundColor: Styles.selectedColor,
    },

    line: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: Styles.padding,
        paddingVertical: Styles.paddingLg,
        minHeight: Styles.listItemHeight,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Styles.borderColor,
    },
    thumb: {
        width: Styles.iconSize,
        height: Styles.iconSize,
        marginRight: Styles.margin,
    },
    content: {
        textAlignVertical: 'center',
        paddingVertical: 15
    },
    extra: {
        textAlign: 'right',
        textAlignVertical: 'center',
    },
    item: {
        flexGrow: 1,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: Styles.padding,
    },
    arrow: {
        width: 8,
        height: 13,
        marginLeft: Styles.margin,
        marginTop: Styles.marginSm,
    },
    arrowV: {
        width: 13,
        height: 8,
        marginLeft: Styles.margin,
    },
    multipleLine: {
        paddingVertical: Styles.margin,
    },
    multipleThumb: {
        width: Styles.iconSize,
        height: Styles.iconSize,
    },
    column: {
        flex: 1,
        flexDirection: 'column',
    },
});
