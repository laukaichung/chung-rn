import * as React from 'react';
import {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, Text,ViewStyle} from 'react-native';
import {Styles} from "../style/Styles";
import ListItem from "./ListItem";

export interface ListProps {
    style?: StyleProp<ViewStyle>;
    renderHeader?: () => ReactNode
    headerContainerStyle?: StyleProp<ViewStyle>
    headerTitle?:string;
    renderFooter?: () => ReactNode
}

export default class List extends React.Component<ListProps, any> {
    public static Item = ListItem;

    public render() {
        const {children, style, renderHeader,headerContainerStyle, headerTitle,renderFooter, ...restProps} = this.props;
        return (
            <View {...restProps as any} style={style}>
                {
                    renderHeader &&
                    <View style={[styles.header,headerContainerStyle]}>
                        {renderHeader()}
                    </View>
                }
                {
                    headerTitle &&
                    <View style={[styles.headerTitleContainer,headerContainerStyle]}>
                        <Text style={styles.headerTitle}>{headerTitle}</Text>
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
    header: {
        padding: Styles.padding,
    },
    headerTitleContainer:{
        padding:Styles.padding,
        backgroundColor: "#e4e4e4"
    },
    headerTitle:{
        color: Styles.colorTextHeading,
        fontSize: Styles.fontSizeHeading
    },
    footer: {
        padding: Styles.padding,
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
