import * as React from 'react';
import {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Styles from "./Styles";

export interface CardProps {
    style?: StyleProp<ViewStyle>;
    full?: boolean;
    marginVertical?: boolean;
    hideBorder?:boolean
    children: ReactNode;
}

const Card = (props: CardProps)=> {
        const {style = {}, full = true,hideBorder, children, marginVertical = false, ...restProps} = props;
        const cardStyle = full ? styles.full : {margin: Styles.margin};
        const childDom = React.Children.map(children, child =>
            React.cloneElement(child as React.ReactElement<any>, {styles}),
        );
        return (
            <View
                style={[
                    {
                        borderColor: Styles.borderColor,
                        borderWidth: hideBorder ? null:Styles.borderWidth,
                        borderRadius: Styles.radiusMd,
                        overflow: 'hidden',
                        flexDirection: 'column',
                        borderBottomWidth: hideBorder?null:2,
                    },
                    cardStyle,
                    style,
                    marginVertical && {marginVertical: Styles.margin}
                ]}
                {...restProps}
            >
                {childDom}
            </View>
        );
};

const styles = StyleSheet.create({
    full: {
        borderRadius: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
});

export default Card;