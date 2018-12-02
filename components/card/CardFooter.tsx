import * as React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import Styles from "../style";
import {ReactNode} from "react";

export interface CardFooterProps {
    style?: StyleProp<ViewStyle>;
    content?: ReactNode;
    extra?: ReactNode;
}

export default class CardFooter extends React.Component<CardFooterProps, any> {
    public render() {

        const {content, extra, style = {}, ...restProps} = this.props;
        const contentDom =
            content !== undefined && React.isValidElement(content) ? (
                <View style={styles.contentContainer}>{content}</View>
            ) : (
                <Text style={styles.textContent}>{content}</Text>
            );

        const extraDom =
            extra !== undefined && React.isValidElement(extra) ? (
                <View style={styles.extraContainer}>{extra}</View>
            ) : (
                <Text style={[styles.extraText]}>{extra}</Text>
            );

        return (
            <View style={[styles.footerContainer, style]} {...restProps}>
                {contentDom}
                {extra && extraDom}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    extraContainer:{
        flex:1
    },
    footerContainer: {
        flexDirection: 'row',
        padding: Styles.padding,

    },
    contentContainer:{
        flex:1
    },
    textContent: {
        flex: 1,
        fontSize: Styles.fontSize,
        color: Styles.textColor,
    },
    extraText: {
        textAlign: 'right',
        fontSize: Styles.fontSize,
        color: Styles.textColor,
    },
});
