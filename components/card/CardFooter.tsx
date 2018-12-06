import * as React from 'react';
import {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Styles from "../style";
import ChungText from "../chung-text";
import UIContext from "../ui-provider/UIContext";

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
                <ChungText style={styles.textContent}>{content}</ChungText>
            );

        const extraDom =
            extra !== undefined && React.isValidElement(extra) ? (
                <View style={styles.extraContainer}>{extra}</View>
            ) : (
                <ChungText style={[styles.extraText]}>{extra}</ChungText>
            );

        return (
            <UIContext.Consumer>
                {
                    ()=>
                    <View style={[styles.footerContainer,{backgroundColor:Styles.inputAreaBackgroundColor}, style]} {...restProps}>
                        {contentDom}
                        {extra && extraDom}
                    </View>
                }
            </UIContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    extraContainer: {
        flex: 1
    },
    footerContainer: {
        flexDirection: 'row',
        padding: Styles.padding,
    },
    contentContainer: {
        flex: 1
    },
    textContent: {
        flex: 1,
        fontSize: Styles.fontSize,
    },
    extraText: {
        textAlign: 'right',
        fontSize: Styles.fontSize,
    },
});
