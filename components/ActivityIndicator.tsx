import * as React from 'react';
import {ActivityIndicator as OriginalActivityIndicator, StyleSheet, View} from 'react-native';
import Styles from "./Styles";
import ChungText from "./ChungText";

export interface ActivityIndicatorNativeProps {
    color?: string;
    animating?: boolean;
    toast?: boolean;
    size?: 'large' | 'small';
    text?: string;
    screenCenter?: boolean;
}

const toastSize = 100;

export default class ActivityIndicator extends React.Component<ActivityIndicatorNativeProps, any> {
    static defaultProps = {
        animating: true,
        color: 'gray',
        size: 'small',
        toast: false,
    };

    public render() {
        let {animating, toast} = this.props;
        if (animating) {
            return toast ? this._renderToast() : this._renderSpinner();
        }
        return null;
    }

    private _renderToast() {
        let {text} = this.props;
        return (
            <View style={[styles.container]}>
                <View style={[styles.innerContainer, {height: toastSize}]}>
                    <View style={[styles.wrapper]}>
                        <OriginalActivityIndicator color="white" size="large"/>
                        {text && <ChungText style={[styles.toast]}>{text}</ChungText>}
                    </View>
                </View>
            </View>
        );
    }

    private _renderSpinner() {
        const {color, size, text} = this.props;
        return (
            <View style={styles.spinner}>
                <OriginalActivityIndicator color={color} size={size}/>
                {text && <ChungText style={styles.tip}>{text}</ChungText>}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'transparent',
        zIndex: Styles.toastZIndex,
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',

    },
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: toastSize,
        height: toastSize,
        borderRadius: Styles.radiusSm,
        backgroundColor: Styles.modalBackgroundColorDark,
    },
    tip: {
        // color: Styles.textBaseColor,
        fontSize: Styles.fontSize,
        marginLeft: Styles.margin,
    },
    toast: {
        color: Styles.whiteTextColor,
        fontSize: Styles.fontSize,
        marginTop: Styles.marginSm,
    },
    spinner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
