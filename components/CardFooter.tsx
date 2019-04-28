import * as React from 'react';
import {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Styles from "./Styles";
import ChungText from "./ChungText";
import {TestProps} from "./type";

export interface CardFooterProps extends TestProps{
    style?: StyleProp<ViewStyle>;
    content?: ReactNode;
    extra?: ReactNode;
}

const CardFooter = (props: CardFooterProps) => {

    const {content, extra, style = {}, ...restProps} = props;
    const contentDom =
        content !== undefined && React.isValidElement(content) ? (
            content
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
        <View
            style={[styles.footerContainer, {backgroundColor: Styles.extremeBackgroundColor}, style]} {...restProps}>
            {contentDom}
            {extra && extraDom}
        </View>

    );
};

const styles = StyleSheet.create({
    extraContainer: {
        flex: 1,
        alignItems: 'flex-end'
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
        fontSize: Styles.fontSize,
    },
});

export default CardFooter;
