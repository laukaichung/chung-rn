import * as React from 'react';
import {ImageURISource, StyleProp, StyleSheet, ViewStyle,} from 'react-native';
import Button from '../button';
import Styles from "../style";
import ChungView from "../chung-view";
import ChungText from "../chung-text";
import ChungImage from "../chung-image";

export interface ResultNativeProps {
    style?: StyleProp<ViewStyle>;
    imgUrl?: string;
    img?: React.ReactNode;
    title?: React.ReactNode;
    message?: React.ReactNode;
    buttonText?: string;
    buttonType?: 'primary' | 'ghost';
    onButtonPress?: () => void;
}

export default class Result extends React.Component<ResultNativeProps, any> {

    render() {
        const {
            style,
            img,
            imgUrl,
            title,
            message,
            buttonText,
            onButtonPress,
            buttonType,
        } = this.props;

        let imgContent: JSX.Element | null = null;
        if (img) {
            imgContent = <ChungView style={styles.imgWrap}>{img}</ChungView>;
        } else if (imgUrl) {
            imgContent = (
                <ChungView style={styles.imgWrap}>
                    <ChungImage
                        source={imgUrl as ImageURISource | ImageURISource[]}
                        style={styles.img as any}
                    />
                </ChungView>
            );
        }

        return (
            <ChungView style={[styles.result, style]}>
                {imgContent}
                {title ? (
                    <ChungView style={styles.title}>
                        {typeof title === 'string' ? (
                            <ChungText style={styles.titleText}>{title}</ChungText>
                        ) : (
                            title
                        )}
                    </ChungView>
                ) : null}
                {message ? (
                    <ChungView style={styles.message}>
                        {typeof message === 'string' ? (
                            <ChungText style={styles.messageText}>{message}</ChungText>
                        ) : (
                            message
                        )}
                    </ChungView>
                ) : null}
                {buttonText ? (
                    <ChungView style={styles.buttonWrap}>
                        <Button
                            style={styles.button}
                            type={buttonType}
                            onPress={onButtonPress}
                        >
                            {buttonText}
                        </Button>
                    </ChungView>
                ) : null}
            </ChungView>
        );
    }
}

const styles = StyleSheet.create({
    result: {
        alignItems: 'center',
        paddingVertical: Styles.paddingXl,
        borderBottomColor: Styles.borderColor,
    },
    imgWrap: {
        margin: 0,
    },
    img: {
        width: 60,
        height: 60,
    },
    title: {
        marginTop: Styles.marginLg,
        paddingHorizontal: Styles.paddingLg,
    },
    titleText: {
        fontSize: 21,
    },
    message: {
        marginTop: Styles.marginLg,
        paddingHorizontal: Styles.paddingLg,
    },
    messageText: {
        fontSize: Styles.captionFontSize,
    },
    buttonWrap: {
        flexDirection: 'row',
        marginTop: Styles.marginLg,
        paddingHorizontal: Styles.paddingLg,
    },
    button: {
        flex: 1,
    },
});
