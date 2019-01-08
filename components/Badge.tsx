import * as React from 'react';
import {Platform, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Styles from "./Styles";
import ChungText from "./ChungText";

export interface BadgeNativeProps {
    style?: StyleProp<ViewStyle>;
    size?: 'lg' | 'sm';
    overflowCount?: number;
    corner?: boolean;
    dot?: boolean;
    text?: any;
}

export default class Badge extends React.Component<BadgeNativeProps, any> {
    static defaultProps = {
        size: 'sm',
        overflowCount: 99,
        dot: false,
        corner: false,
    };

    render() {
        let {
            style,
            children,
            text,
            size,
            overflowCount,
            dot,
            corner,
            ...restProps
        } = this.props;
        text =
            typeof text === 'number' && text > (overflowCount as number)
                ? `${overflowCount}+`
                : text;

        // dot mode don't need text
        if (dot) {
            text = '';
        }
        // fake styles
        const fakeStyles = (styles as any) as { [key: string]: ViewStyle };
        const badgeCls = corner ? 'textCorner' : 'textDom';
        const contentDom = !dot ? (
            <View {...restProps} style={[styles[badgeCls], fakeStyles[`${badgeCls}${size}`]]}
            >
                <ChungText style={[styles.text]}>{text}</ChungText>
            </View>
        ) : (
            <View {...restProps} style={[styles.dot, fakeStyles[`dotSize${size}`]]}/>
        );

        return (
            <View style={[styles.wrap, style]}>
                <View style={[fakeStyles[`${badgeCls}Wrap`]]}>
                    {children}
                    {text || dot ? contentDom : null}
                </View>
            </View>
        );
    }
}

const grid = 4;

const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
    },
    textCornerWrap: {
        overflow: 'hidden',
    },
    dot: {
        width: 2 * grid,
        height: 2 * grid,
        borderRadius: grid,
        backgroundColor: Styles.badgeBackgroundColor,
        position: 'absolute',
        top: -1 * grid,
        right: -1 * grid,
    },
    dotSizelarge: {
        width: 4 * grid,
        height: 4 * grid,
        borderRadius: 2 * grid,
    },
    textDom: {
        paddingVertical: 0.5 * grid,
        paddingHorizontal: (Platform.OS === 'ios' ? 1.5 : 2) * grid,
        backgroundColor: Styles.badgeBackgroundColor,
        borderRadius: 4 * Styles.radiusSm,
        borderStyle: 'solid',
        position: 'absolute',
        top: -10,
        // -15 would move the badge out of the screen in List.Item.extra
        //right: -15,
        right: -10,

    },
    textCorner: {
        width: 18 * grid,
        backgroundColor: Styles.badgeBackgroundColor,
        transform: [
            {
                rotate: '45deg',
            },
        ],
        position: 'absolute',
        top: 2 * grid,
    },
    textCornerlarge: {
        width: 26 * grid,
        top: 3 * grid,
    },
    text: {
        color: Styles.whiteTextColor,
        textAlign: 'center',
    },
});

