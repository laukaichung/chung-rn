import * as React from 'react';
import {ImageURISource, StyleProp, StyleSheet,Text, ViewStyle,} from 'react-native';
import Button from '../button';
import Styles from "../style";
import ChungView from "../chung-view";
import ChungImage from "../chung-image";
import Header from "../header";

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
            <ChungView style={[styles.result, style,{borderColor:Styles.borderColor}]}>
                {imgContent}
                {title ? (
                    <ChungView style={styles.title}>
                        {typeof title === 'string' ? (
                            <Header text={title}/>
                        ) : (
                            title
                        )}
                    </ChungView>
                ) : null}
                {message ? (
                    <ChungView style={styles.message}>
                        {typeof message === 'string' ? (
                            <Text style={styles.messageText}>{message}</Text>
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
        borderWidth:Styles.borderWidth
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
        color:"#929083"
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
