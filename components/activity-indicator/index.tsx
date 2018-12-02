import * as React from 'react';
import {ActivityIndicator as OriginalActivityIndicator, StyleSheet,Text, View} from 'react-native';
import Styles from "../style";

export interface ActivityIndicatorNativeProps {
    color?: string;
    animating?: boolean;
    toast?: boolean;
    size?: 'large' | 'small';
    text?: string;
}

export default class ActivityIndicator extends React.Component<ActivityIndicatorNativeProps, any> {
    static defaultProps = {
        animating: true,
        color: 'gray',
        size: 'small',
        toast: false,
    };

    public render() {
        if (this.props.animating) {
            return this.props.toast ? this._renderToast() : this._renderSpinner();
        }
        return null;
    }

    private _renderToast() {
        let {text} = this.props;
        return (
            <View style={[styles.container]}>
                <View style={[styles.innerContainer, {height: 89}]}>
                    <View style={[styles.wrapper]}>
                        <OriginalActivityIndicator color="white" size="large"/>
                        {text && <Text style={[styles.toast]}>{text}</Text>}
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
                {text && <Text style={styles.tip}>{text}</Text>}
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
        width: 89,
        height: 89,
        borderRadius: Styles.radiusSm,
        backgroundColor: Styles.toastFill,
    },
    tip: {
        color: Styles.textBaseColor,
        fontSize: Styles.fontSize,
        marginLeft: Styles.margin,
    },
    toast: {
        color: Styles.InverseTextColor,
        fontSize: Styles.fontSize,
        marginTop: Styles.marginSm,
    },
    spinner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
