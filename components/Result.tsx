import * as React from 'react';
import {ImageURISource, StyleProp, StyleSheet, Text, View, ViewStyle,} from 'react-native';
import Button from './Button';
import Styles from "./Styles";
import ChungImage from "./ChungImage";
import Icon, {IconSize} from "./Icon";

export interface ResultNativeProps {
    style?: StyleProp<ViewStyle>;
    imgUrl?: string;
    icon?: string;
    iconSize?:IconSize;
    title?: React.ReactNode;
    message?: React.ReactNode;
    buttonText?: string;
    buttonType?: 'primary' | 'ghost';
    showBorder?: boolean;
    onButtonPress?: () => void;
    marginHorizontal?: boolean
    type?: "error" | "success" | "warning"
}

export default class Result extends React.Component<ResultNativeProps, any> {

    public render() {
        const {
            style,
            type,
            icon,
            imgUrl,
            title,
            marginHorizontal = true,
            message,
            buttonText,
            onButtonPress,
            buttonType,
            showBorder = false,
        } = this.props;

        let imgContent: JSX.Element | null = null;
        if (imgUrl) {
            imgContent = (
                <ChungImage
                    source={imgUrl as ImageURISource | ImageURISource[]}
                    style={styles.img as any}
                />
            );
        } else if (icon) {
            imgContent = (
                <Icon name={icon} size={"xl"}/>
            )
        }

        let typeColor = type === "error" ? Styles.errorColor :
            type === "warning" ? Styles.warningColor : Styles.textColor;

        return (
            <View style={
                [
                    styles.result,
                    showBorder && {borderColor: typeColor, borderWidth: Styles.borderWidth},
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
