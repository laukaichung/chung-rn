import * as React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import Styles from "../style";

export interface CardProps {
    style?: StyleProp<ViewStyle>;
    full?: boolean;
    marginVertical?:boolean;

}

export default class Card extends React.Component<CardProps, any> {
    static Header = CardHeader;
    static Body = CardBody;
    static Footer = CardFooter;
    render() {
        const {style = {}, full = false, children,marginVertical = true,...restProps} = this.props;
        const cardStyle = full ? styles!.full : {};
        const childDom = React.Children.map(children, child =>
            React.cloneElement(child as React.ReactElement<any>, {styles}),
        );
        return (
            <View style={[styles!.card, cardStyle, style,marginVertical && {marginVertical:Styles.margin}]} {...restProps}>
                {childDom}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        borderWidth: Styles.borderWidth,
        borderColor: Styles.borderColor,
        borderRadius: Styles.radiusMd,
        paddingBottom: Styles.paddingSm,
        flexDirection: 'column',
        backgroundColor: Styles.backgroundColor,
    },
    full: {
        borderRadius: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
});

