import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Item from './ListItem';
import {Styles} from "../style/Styles";

export interface ListProps {
    style?: StyleProp<ViewStyle>;
    renderHeader?: () => ReactNode
    renderFooter?: () => ReactNode
}

export default class List extends React.Component<ListProps, any> {
    static Item = Item;

    render() {
        const {
            children,
            style,
            renderHeader,
            renderFooter,
            ...restProps
        } = this.props;

        return (
            <View {...restProps as any} style={style}>
                <View style={styles.header}>
                    {renderHeader && renderHeader()}
                </View>
                <View style={styles.body}>
                    {children}
                    <View style={[styles.bodyBottomLine]}/>
                </View>
                <View style={styles.footer}>
                    {renderFooter && renderFooter()}
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    header: {
        paddingHorizontal:Styles.padding,
    },
    footer: {
        paddingHorizontal:Styles.padding,
    },
    body: {
        backgroundColor: Styles.backgroundColor,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: Styles.borderColor,
    },
    bodyBottomLine: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Styles.borderColor,
    },
});
