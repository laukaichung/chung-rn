import * as React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import Styles from "../style";
import UIContext from "../ui-provider/UIContext";
import {ChungStyles} from "../index";

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
        const {style = {}, full = false, children, marginVertical = true, ...restProps} = this.props;
        const cardStyle = full ? styles.full : {margin:ChungStyles.margin};
        const childDom = React.Children.map(children, child =>
            React.cloneElement(child as React.ReactElement<any>, {styles}),
        );
        return (
            <UIContext.Consumer>
                {
                    ()=>
                    <View
                        style={[
                            styles.card,
                            cardStyle,
                            {borderColor:Styles.borderColor},
                            style,
                            marginVertical && {marginVertical: Styles.margin}
                            ]}
                        {...restProps}>
                        {childDom}
                    </View>
                }
            </UIContext.Consumer>
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

