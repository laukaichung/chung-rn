import * as React from 'react';
import {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, Text,ViewStyle} from 'react-native';
import Styles from "../style";
import ListItem from "./ListItem";
import ChungText from "../chung-text";

export interface ListProps {
    style?: StyleProp<ViewStyle>;
    renderHeader?: () => ReactNode
    headerTitleContainerStyle?:StyleProp<ViewStyle>
    headerTitle?:string;
    renderFooter?: () => ReactNode
}

export default class List extends React.Component<ListProps, any> {
    public static Item = ListItem;

    public render() {
        const {children, style, renderHeader, headerTitle,headerTitleContainerStyle,renderFooter, ...restProps} = this.props;
        return (
            <View {...restProps as any} style={style}>
                {
                    renderHeader && renderHeader()
                }
                {
                    headerTitle &&
                    <View style={[styles.headerTitleContainer,headerTitleContainerStyle]}>
                        <ChungText style={styles.headerTitle}>{headerTitle}</ChungText>
                    </View>
                }
                <View style={styles.body}>
                    {children}
                    <View style={[styles.bodyBottomLine]}/>
                </View>
                {
                    renderFooter &&
                    <View style={styles.footer}>
                        {renderFooter()}
                    </View>
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    headerTitleContainer:{
        padding:Styles.padding,
        backgroundColor: "#e4e4e4"
    },
    headerTitle:{
        color: Styles.headerColor,
        fontSize: Styles.HeaderFontSize
    },
    footer: {

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
