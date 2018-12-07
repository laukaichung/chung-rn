import * as React from 'react';
import {ReactNode} from 'react';
import {Image, ImageStyle, StyleProp, StyleSheet, View, ViewStyle,} from 'react-native';
import Styles from "../style";
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
                <View style={{flex: 1}}>{title}</View>
            ) : (
                <ChungText style={styles.headerContent}>{title}</ChungText>
            );

        const extraDom =
            extra === undefined ? null : React.isValidElement(extra) ? (
                <View style={{flex: 1}}>{extra}</View>
            ) : (
                <ChungText style={[styles.headerExtra]}>{extra}</ChungText>
            );

        return (
            <View style={
                [
                    styles.headerWrap,
                    {borderColor: Styles.borderColor, backgroundColor: Styles.extremeBackgroundColor},
                    style
                ]
            } {...restProps}>
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
        paddingHorizontal: Styles.padding,
        alignItems: 'center',
        borderBottomWidth: Styles.borderWidth,
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
        fontSize: Styles.headerFontSize,
        flex: 1,
    },
    headerExtra: {
        flex: 1,
        fontSize: Styles.headerFontSize,
        textAlign: 'right',
    },
});
