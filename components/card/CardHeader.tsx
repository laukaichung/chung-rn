import * as React from 'react';
import {Image, ImageStyle, StyleProp, StyleSheet, ViewStyle,} from 'react-native';
import Styles from "../style";
import {ReactNode} from "react";
import ChungView from "../chung-view";
import ChungText from "../chung-text";

export interface CardHeaderProps {
    style?: StyleProp<ViewStyle>;
    thumbStyle?: StyleProp<ImageStyle>;
    title?: ReactNode;
    /** need url of img, if this is string. */
    thumb?: ReactNode;
    extra?: ReactNode;
}

export default class CardHeader extends React.Component<CardHeaderProps, any> {

    public render() {
        const {
            title,
            thumb,
            thumbStyle,
            extra,
            style,
            ...restProps
        } = this.props;

        const titleDom =
            title === undefined ? null : React.isValidElement(title) ? (
                <ChungView style={{flex: 1}}>{title}</ChungView>
            ) : (
                <ChungText style={styles.headerContent}>{title}</ChungText>
            );

        const extraDom =
            extra === undefined ? null : React.isValidElement(extra) ? (
                <ChungView style={{flex: 1}}>{extra}</ChungView>
            ) : (
                <ChungText style={[styles.headerExtra]}>{extra}</ChungText>
            );

        return (
            <ChungView style={[styles.headerWrap, style]} {...restProps}>
                <ChungView style={[styles.headerTitle]}>
                    {typeof thumb === 'string' ? (
                        <Image
                            source={{uri: thumb}}
                            style={[styles.headerImage, thumbStyle] as any}
                        />
                    ) : (
                        thumb
                    )}
                    {titleDom}
                </ChungView>
                {extra ? extraDom : null}
            </ChungView>
        );
    }
}

const styles = StyleSheet.create({
    headerWrap: {
        flexDirection: 'row',
        paddingVertical: Styles.paddingSm,
        paddingHorizontal: Styles.padding,
        alignItems: 'center',
        borderBottomWidth: Styles.borderWidth,
        borderColor: Styles.borderColor,
    },
    headerTitle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerImage: {
        marginRight: Styles.marginSm,
    },
    headerContent: {
        fontSize: Styles.HeaderFontSize,
        flex: 1,
    },
    headerExtra: {
        flex: 1,
        fontSize: Styles.HeaderFontSize,
        textAlign: 'right',
    },
});
