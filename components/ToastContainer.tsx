import * as React from 'react';
import {ActivityIndicator, Animated, StyleSheet, View, ViewStyle,} from 'react-native';
import Styles from "./Styles";
import Icon, {IconProps} from "./Icon";
import WhiteSpace from "./WhiteSpace";
import ChungText from "./ChungText";

export type ToastType = "success" | "fail" | "loading" | "bottomInfo"

export interface ToastProps {
    content: string;
    duration?: number;
    onClose?: () => void;
    mask?: boolean;
    type?: ToastType;
    onAnimationEnd?: () => void;
    iconProps?: IconProps
}

export default class ToastContainer extends React.Component<ToastProps, any> {
    static defaultProps = {
        duration: 3,
        mask: true,
    };

    anim: Animated.CompositeAnimation | null;

    constructor(props: ToastProps) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),
        };
    }

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

        } else if (type === "success" || type === "fail") {
            iconDom = (
                <Icon
                    {...iconProps}
                    size={"xl"}
                />
            )
        } else if (type === "bottomInfo"){
            containerStyle.justifyContent = "flex-end";
            containerStyle.marginBottom = Styles.margin
        }

        return (
            <View
                style={containerStyle}
                pointerEvents={mask ? undefined : 'box-none'}
            >
                <View style={[styles.innerContainer]}>
                    <Animated.View style={{opacity: this.state.fadeAnim}}>
                        <View
                            style={[
                                styles.innerWrap,
                                iconDom ? styles.iconToast : styles.textToast,
                                {
                                    backgroundColor: Styles.isDarkMode ? Styles.primaryColorDark : "grey",
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
                    </Animated.View>
                </View>
            </View>
        );
    }

    componentDidMount() {
        const {onClose, onAnimationEnd} = this.props;
        const duration = this.props.duration as number;
        const timing = Animated.timing;
        if (this.anim) {
            this.anim = null;
        }
        const animArr = [
            timing(this.state.fadeAnim, {toValue: 1, duration: 200}),
            Animated.delay(duration * 1000),
        ];
        if (duration > 0) {
            animArr.push(timing(this.state.fadeAnim, {toValue: 0, duration: 200}));
        }
        this.anim = Animated.sequence(animArr);
        this.anim.start(() => {
            if (duration > 0) {
                this.anim = null;
                if (onClose) {
                    onClose();
                }
                if (onAnimationEnd) {
                    onAnimationEnd();
                }
            }
        });
    }

    componentWillUnmount() {
        if (this.anim) {
            this.anim.stop();
            this.anim = null;
        }
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
