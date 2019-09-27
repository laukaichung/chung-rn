import * as React from 'react';
import {RefObject, useEffect, useRef} from 'react';
import {ActivityIndicator, StyleSheet, View, ViewStyle,} from 'react-native';
import Styles from "./Styles";
import Icon, {IconProps} from "./Icon";
import WhiteSpace from "./WhiteSpace";
import ChungText from "./ChungText";
import * as Animatable from "react-native-animatable";
import {TestProps} from "./type";

export type ToastType = "success" | "fail" | "loading" | "bottomInfo"

export interface ToastProps extends TestProps {
    content: string;
    duration?: number;
    onClose?: () => void;
    mask?: boolean;
    type?: ToastType;
    iconProps?: IconProps
}

const ToastContainer = (props: ToastProps) => {
    const animationRef: RefObject<any> = useRef();
    let timeOut;
    const {type = "info", content, duration = 300, onClose, testID, iconProps, mask = true} = props;
    useEffect(() => {
        const {current} = animationRef;
        if (type === "bottomInfo") {
            current.lightSpeedIn(500).then(() => {
                timeOut = setTimeout(async () => {
                    await current.lightSpeedOut(500);
                    if (onClose) onClose()
                }, duration)
            })

        } else {
            current.zoomIn(500).then(() => {
                timeOut = setTimeout(async () => {
                    await current.zoomOut(500);
                    if (onClose) onClose();
                }, duration)
            })
        }

        return () => {
            clearTimeout(timeOut);
        }
    });

    let iconDom: React.ReactElement<any> | null = null;
    let containerStyle: ViewStyle = {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: Styles.toastZIndex,
    };

    if (type === 'loading') {

        iconDom = (
            <ActivityIndicator
                animating
                style={[styles.centering]}
                color="white"
                size="large"
            />
        );

    } else if (type === "bottomInfo") {

        containerStyle.justifyContent = "flex-end";
        containerStyle.marginBottom = Styles.margin

    } else if (iconProps) {

        iconDom = (
            <Icon
                {...iconProps}
                size={"xl"}
            />
        )
    }

    return (
        <View
            testID={testID}
            style={containerStyle}
            pointerEvents={mask ? undefined : 'box-none'}
        >
            <View style={[styles.innerContainer]}>
                <Animatable.View ref={animationRef}>
                    <View
                        style={[
                            styles.innerWrap,
                            iconDom ? styles.iconToast : styles.textToast,
                            {
                                backgroundColor: Styles.toastBackgroundColor,
                            }
                        ]}
                    >
                        {
                            iconDom && (
                                <React.Fragment>
                                    {iconDom}
                                    <WhiteSpace/>
                                </React.Fragment>
                            )
                        }
                        <ChungText style={styles.content}>
                            {content}
                        </ChungText>
                    </View>
                </Animatable.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    innerContainer: {
        backgroundColor: 'transparent',
    },
    innerWrap: {
        alignItems: 'center',
        minWidth: 100,
    },
    iconToast: {
        borderRadius: Styles.radiusLg,
        padding: Styles.paddingLg
    },
    textToast: {
        borderRadius: Styles.radiusSm,
        paddingVertical: Styles.padding,
        paddingHorizontal: Styles.paddingLg
    },
    content: {
        color: Styles.whiteTextColor,
    },
    image: {
        width: Styles.iconSizeLg,
        height: Styles.iconSizeLg,
        marginBottom: Styles.marginXs,
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: Styles.padding,
    },
});

export default ToastContainer;