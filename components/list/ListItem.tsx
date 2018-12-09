import * as React from 'react';
import {Image, StyleProp, StyleSheet, View, ViewStyle,} from 'react-native';
import Styles from "../style";
import {CustomTouchableHighlight} from "../custom-touchable-highlight";
import {ReactNode} from "react";
import ChungText from "../chung-text";

type HideBorderOptions = "bottom" | "top" | "all" | "left" | "right"

export interface ListItemCommonProps {
    hideBorder?: HideBorderOptions[];
}

export interface ListItemProps extends ListItemCommonProps {
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
    onPress?: () => void;
    onLongPress?: () => void;
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
            onPress,
            hideBorder,
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
                        <ChungText style={[styles.content]} {...numberOfLines}>
                            {children}
                        </ChungText>
                    </View>
                );
            }
        }

        let extraDom;
        if (extra) {
            extraDom = (
                <View style={[styles.column]}>
                    <ChungText style={[styles.extra]} {...numberOfLines}>
                        {extra}
                    </ChungText>
                </View>
            );
            if (React.isValidElement(extra)) {
                const extraChildren = (extra.props as any).children;
                if (Array.isArray(extraChildren)) {
                    const tempExtraDom: any[] = [];
                    extraChildren.forEach((el, index) => {
                        if (typeof el === 'string') {
                            tempExtraDom.push(
                                <ChungText
                                    {...numberOfLines}
                                    style={[styles.extra]}
                                    key={`${index}-children`}
                                >
                                    {el}
                                </ChungText>,
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

        let itemBorderStyle: StyleProp<ViewStyle>[] = [{
            borderWidth: Styles.borderWidth,
            borderColor: Styles.borderColor
        }];

        if(hideBorder) {

            if (hideBorder.indexOf("bottom") > -1) {
                itemBorderStyle.push({borderBottomWidth: 0})
            }

            if (hideBorder.indexOf("left") > -1) {
                itemBorderStyle.push({borderLeftWidth: 0})
            }

            if (hideBorder.indexOf("right") > -1) {
                itemBorderStyle.push({borderRightWidth: 0})
            }

            if (hideBorder.indexOf("top") > -1) {
                itemBorderStyle.push({borderTopWidth: 0})
            }

            if (hideBorder.indexOf("all") > -1) {
                itemBorderStyle.push({borderWidth: 0})
            }
        }

        const itemView = (
            <View {...restProps}
                  style={[
                      styles.item,
                      itemBorderStyle,
                      listItemStyle,
                  ]}>
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
                onPress={onPress}
                onLongPress={onLongPress}>
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
    line: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: Styles.padding,
        //paddingVertical: Styles.paddingLg,
        //minHeight: Styles.listItemHeight,
    },
    thumb: {
        width: Styles.iconSizeMd,
        height: Styles.iconSizeMd,
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
        paddingVertical: Styles.padding,
    },
    multipleThumb: {
        width: Styles.iconSizeMd,
        height: Styles.iconSizeMd,
    },
    column: {
        flex: 1,
        flexDirection: 'column',
    },
});
