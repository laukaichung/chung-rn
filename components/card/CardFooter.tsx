import * as React from 'react';
import {ReactNode} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import Styles from "../style";
import ChungView from "../chung-view";
import ChungText from "../chung-text";

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
                <ChungView style={styles.contentContainer}>{content}</ChungView>
            ) : (
                <ChungText style={styles.textContent}>{content}</ChungText>
            );

        const extraDom =
            extra !== undefined && React.isValidElement(extra) ? (
                <ChungView style={styles.extraContainer}>{extra}</ChungView>
            ) : (
                <ChungText style={[styles.extraText]}>{extra}</ChungText>
            );

        return (
            <ChungView style={[styles.footerContainer, style]} {...restProps}>
                {contentDom}
                {extra && extraDom}
            </ChungView>
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
        //color: Styles.textColor,
    },
    extraText: {
        textAlign: 'right',
        fontSize: Styles.fontSize,
        //color: Styles.textColor,
    },
});
