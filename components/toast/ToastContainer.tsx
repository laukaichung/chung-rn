import * as React from 'react';
import {
    ActivityIndicator,
    Animated,
    Image, Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Styles from "../styles/Styles";
import Icon from "../icon/Icon";

export interface ToastProps {
    content: string;
    duration?: number;
    onClose?: () => void;
    mask?: boolean;
    type?: string;
    onAnimationEnd?: () => void;
}

const iconType: {
    [key: string]: any;
} = {
    success: "thumbs-o-up",
    fail: "thumbs-o-down",
    offline: "chain-broken"
};


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

    render() {
        const {type = '', content, mask} = this.props;
        let iconDom: React.ReactElement<any> | null = null;
        if (type === 'loading') {
            iconDom = (
                <ActivityIndicator
                    animating
                    style={[styles.centering]}
                    color="white"
                    size="large"
                />
            );
        } else if (type === 'info') {
            iconDom = null;
        } else {

            iconDom = <Icon name={iconType[type]} size={"xl"}/>
        }

        return (
            <View
                style={[styles.container]}
                pointerEvents={mask ? undefined : 'box-none'}
            >
                <View style={[styles.innerContainer]}>
                    <Animated.View style={{opacity: this.state.fadeAnim}}>
                        <View
                            style={[
                                styles.innerWrap,
                                iconDom ? styles.iconToast : styles.textToast,
                            ]}
                        >
                            {iconDom}
                            <Text style={styles.content}>{content}</Text>
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
    container: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 64 : 54,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: Styles.toastZIndex,
    },
    innerContainer: {
        backgroundColor: 'transparent',
    },
    innerWrap: {
        alignItems: 'center',
        backgroundColor: Styles.modalBackgroundColorDark,
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
        fontSize: Styles.subheaderFontSize,
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
})
