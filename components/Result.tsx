import * as React from 'react';
import {ImageURISource, StyleProp, StyleSheet, View, ViewStyle,} from 'react-native';
import Button, {ButtonProps} from './Button';
import Styles from "./Styles";
import ChungImage from "./ChungImage";
import Icon, {IconProps} from "./Icon";
import ChungText from "./ChungText";
import {TestProps} from "./type";

export interface ResultNativeProps extends TestProps {
    style?: StyleProp<ViewStyle>;
    imgUrl?: string;
    iconProps?: IconProps;
    title?: React.ReactNode;
    children?: React.ReactNode;
    buttonProps?: ButtonProps;
    showBorder?: boolean;
    marginHorizontal?: boolean
    type?: "error" | "success" | "warning"
}

const Result = (props: ResultNativeProps) => {

    const {
        style,
        type,
        children,
        imgUrl,
        iconProps,
        title,
        marginHorizontal = true,
        showBorder = false,
        buttonProps,
        testID,
    } = props;

    let imgContent: JSX.Element | null = null;
    if (imgUrl) {
        imgContent = (
            <ChungImage
                source={imgUrl as ImageURISource | ImageURISource[]}
                style={styles.img as any}
            />
        );
    } else if (iconProps) {
        const {size} = iconProps;
        imgContent = (
            <Icon {...iconProps} size={size || "xl"}/>
        )
    }

    let typeColor = type === "error" ? Styles.errorColor :
        type === "warning" ? Styles.warningColor : Styles.fontColor;

    return (
        <View
            testID={testID}
            style={
                [
                    styles.result,
                    showBorder && {borderColor: typeColor, borderWidth: Styles.borderWidth},
                    marginHorizontal && {marginHorizontal: Styles.margin},
                    style,
                ]
            }
        >
            {imgContent}
            {title ? (
                <View style={styles.title}>
                    {typeof title === 'string' ? (
                        <ChungText style={{fontSize: Styles.headerFontSize, color: typeColor}}>{title}</ChungText>
                    ) : (
                        title
                    )}
                </View>
            ) : null}
            {children ? (
                <View style={styles.message}>
                    {children}
                </View>
            ) : null}
            {buttonProps ? (
                <View style={styles.buttonWrap}>
                    <Button{...buttonProps}/>
                </View>
            ) : null}
        </View>
    );
};

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

export default Result;
