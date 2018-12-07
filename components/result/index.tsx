import * as React from 'react';
import {ImageURISource, StyleProp, StyleSheet, Text, View, ViewStyle,} from 'react-native';
import Button from '../button';
import Styles from "../style";
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
    marginHorizontal?: boolean
    type?: "error" | "success" | "warning"
}

export default class Result extends React.Component<ResultNativeProps, any> {

    public render() {
        const {
            style,
            img,
            type,
            imgUrl,
            title,
            marginHorizontal = true,
            message,
            buttonText,
            onButtonPress,
            buttonType,
        } = this.props;

        let imgContent: JSX.Element | null = null;
        if (img) {
            imgContent = <View style={styles.imgWrap}>{img}</View>;
        } else if (imgUrl) {
            imgContent = (
                <View style={styles.imgWrap}>
                    <ChungImage
                        source={imgUrl as ImageURISource | ImageURISource[]}
                        style={styles.img as any}
                    />
                </View>
            );
        }

        let typeColor = type === "error" ? Styles.errorColor :
            type === "warning" ? Styles.warningColor : Styles.textColor;

        return (
            <View style={
                [
                    styles.result,
                    {borderColor: typeColor},
                    marginHorizontal && {marginHorizontal: Styles.margin},
                    style,
                ]}>
                {imgContent}
                {title ? (
                    <View style={styles.title}>
                        {typeof title === 'string' ? (
                            <Text style={{fontSize: Styles.headerFontSize, color: typeColor}}>{title}</Text>
                        ) : (
                            title
                        )}
                    </View>
                ) : null}
                {message ? (
                    <View style={styles.message}>
                        {typeof message === 'string' ? (
                            <Text style={{color: typeColor}}>{message}</Text>
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
                            onPress={onButtonPress}
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
        borderWidth: Styles.borderWidth
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
    buttonWrap: {
        flexDirection: 'row',
        marginTop: Styles.marginLg,
        paddingHorizontal: Styles.paddingLg,
    },
    button: {
        flex: 1,
    },
});
