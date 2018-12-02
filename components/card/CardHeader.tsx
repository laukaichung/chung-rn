import * as React from 'react';
import {Image, ImageStyle, StyleProp, StyleSheet, Text, View, ViewStyle,} from 'react-native';
import Styles from "../style";
import {ReactNode} from "react";

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
                <View style={{flex: 1}}>{title}</View>
            ) : (
                <Text style={styles.headerContent}>{title}</Text>
            );

        const extraDom =
            extra === undefined ? null : React.isValidElement(extra) ? (
                <View style={{flex: 1}}>{extra}</View>
            ) : (
                <Text style={[styles.headerExtra]}>{extra}</Text>
            );

        return (
            <View style={[styles.headerWrap, style]} {...restProps}>
                <View style={[styles.headerTitle]}>
                    {typeof thumb === 'string' ? (
                        <Image
                            source={{uri: thumb}}
                            style={[styles.headerImage, thumbStyle] as any}
                        />
                    ) : (
                        thumb
                    )}
                    {titleDom}
                </View>
                {extra ? extraDom : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerWrap: {
        flexDirection: 'row',
        paddingVertical: Styles.paddingSm,
        paddingRight: Styles.padding,
        marginLeft: Styles.margin,
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
        color: Styles.textBaseColor,
        fontSize: Styles.HeaderFontSize,
        flex: 1,
    },
    headerExtra: {
        flex: 1,
        fontSize: Styles.HeaderFontSize,
        color: Styles.textColor,
        textAlign: 'right',
    },
});
