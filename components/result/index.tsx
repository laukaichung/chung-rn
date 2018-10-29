import * as React from 'react';
import {
    Image,
    ImageURISource,
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';
import Button from '../button';
import Styles from "../style";

export interface ResultNativeProps {
    style?: StyleProp<ViewStyle>;
    imgUrl?: string;
    img?: React.ReactNode;
    title?: React.ReactNode;
    message?: React.ReactNode;
    buttonText?: string;
    buttonType?: 'primary' | 'ghost';
    onButtonClick?: () => void;
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
            onButtonClick,
            buttonType,
        } = this.props;

        let imgContent: JSX.Element | null = null;
        if (img) {
            imgContent = <View style={styles.imgWrap}>{img}</View>;
        } else if (imgUrl) {
            imgContent = (
                <View style={styles.imgWrap}>
                    <Image
                        source={imgUrl as ImageURISource | ImageURISource[]}
                        style={styles.img as any}
                    />
                </View>
            );
        }

        return (
            <View style={[styles.result, style]}>
                {imgContent}
                {title ? (
                    <View style={styles.title}>
                        {typeof title === 'string' ? (
                            <Text style={styles.titleText}>{title}</Text>
                        ) : (
                            title
                        )}
                    </View>
                ) : null}
                {message ? (
                    <View style={styles.message}>
                        {typeof message === 'string' ? (
                            <Text style={styles.messageText}>{message}</Text>
                        ) : (
                            message
                        )}
                    </View>
                ) : null}
                {buttonText ? (
                    <View style={styles.buttonWrap}>
                        <Button
                            style={styles.button}
                            type={buttonType}
                            onClick={onButtonClick}
                        >
                            {buttonText}
                        </Button>
                    </View>
                ) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    result: {
        alignItems: 'center',
        paddingVertical: Styles.paddingXl,
        backgroundColor: Styles.backgroundColor,
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
        color: Styles.textBaseColor,
    },
    message: {
        marginTop: Styles.marginLg,
        paddingHorizontal: Styles.paddingLg,
    },
    messageText: {
        fontSize: Styles.fontSizeCaption,
        color: Styles.colorTextCaption,
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
