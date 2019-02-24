import * as React from 'react';
import {createRef, RefObject} from 'react';
import {ActivityIndicator, StyleSheet, View, ViewStyle,} from 'react-native';
import Styles from "./Styles";
import Icon, {IconProps} from "./Icon";
import WhiteSpace from "./WhiteSpace";
import ChungText from "./ChungText";
import * as Animatable from "react-native-animatable";


export type ToastType = "success" | "fail" | "loading" | "bottomInfo"

export interface ToastProps {
    content: string;
    duration?: number;
    onClose: () => void;
    mask?: boolean;
    type?: ToastType;
    iconProps?: IconProps
}

export default class ToastContainer extends React.Component<ToastProps, any> {
    private animationRef: RefObject<any> = createRef();
    private timeOut;
    public static defaultProps = {
        duration: 3000,
        mask: true,
    };

    public render() {
        const {type = "info", content, iconProps, mask = true} = this.props;
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

        }  else if (type === "bottomInfo"){

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
                style={containerStyle}
                pointerEvents={mask ? undefined : 'box-none'}
            >
                <View style={[styles.innerContainer]}>
                    <Animatable.View ref={this.animationRef}>
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
    }

    public async componentDidMount() {
        const {duration, type, onClose} = this.props;
        const {current} = this.animationRef;

        if(type === "bottomInfo"){
            await current.lightSpeedIn(500);
            this.timeOut = setTimeout(async ()=>{
                await current.lightSpeedOut(500);
                if(onClose) onClose()
            },duration)

        }else {
            await current.zoomIn(500);
            this.timeOut = setTimeout(async ()=>{
                await current.zoomOut(500);
                if(onClose) onClose();
            }, duration)
        }
    }

    public componentWillUnmount() {
        clearTimeout(this.timeOut);
    }

}

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
