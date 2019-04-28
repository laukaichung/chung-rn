import * as React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Styles from "./Styles";
import {ReactNode} from "react";
import {TestProps} from "./type";

export interface CardBodyProps extends TestProps{
    style?: StyleProp<ViewStyle>;
    marginVertical?: boolean
    paddingHorizontal?: boolean
    children: ReactNode;
}

const CardBody = (props: CardBodyProps) => {
    const {style = {}, marginVertical = true, paddingHorizontal, ...restProps} = props;
    return (
        <View
            style={[
                styles.body,
                style,
                {
                    paddingHorizontal: paddingHorizontal && Styles.padding,
                    marginVertical: marginVertical && Styles.margin
                }
            ]} {...restProps}
        />
    )
};

const styles = StyleSheet.create({
    body: {
        flexGrow: 1,
    }
});

export default CardBody;