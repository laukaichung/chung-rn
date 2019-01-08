import * as React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import Styles from "./Styles";

export interface CardProps {
    style?: StyleProp<ViewStyle>;
    full?: boolean;
    marginVertical?: boolean;

}

export default class Card extends React.Component<CardProps, any> {
    static Header = CardHeader;
    static Body = CardBody;
    static Footer = CardFooter;

    public render() {
        const {style = {}, full = true, children, marginVertical = false, ...restProps} = this.props;
        const cardStyle = full ? styles.full : {margin: Styles.margin};
        const childDom = React.Children.map(children, child =>
            React.cloneElement(child as React.ReactElement<any>, {styles}),
        );
        return (
            <View
                style={[
                    styles.card,
                    cardStyle,
                    {borderColor: Styles.borderColor},
                    style,
                    marginVertical && {marginVertical: Styles.margin}
                ]}
                {...restProps}>
                {childDom}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        borderWidth: Styles.borderWidth,
        borderRadius: Styles.radiusMd,
        overflow: 'hidden',
        flexDirection: 'column',
    },
    full: {
        borderRadius: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
});
