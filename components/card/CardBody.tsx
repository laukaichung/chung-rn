import * as React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Styles from "../style";
import {ChungStyles} from "../index";

export interface CardBodyProps {
  style?: StyleProp<ViewStyle>;
  marginVertical?:boolean
  paddingHorizontal?:boolean
}

export default class CardBody extends React.Component<CardBodyProps, any> {
  public render() {
    const { style = {},marginVertical = true,paddingHorizontal, ...restProps } = this.props;
    return <View
        style={[
            styles.body,
            style,
            {paddingHorizontal: paddingHorizontal && Styles.padding,marginVertical:marginVertical && ChungStyles.margin}
        ]} {...restProps} />;
  }
}

const styles = StyleSheet.create({
    body: {
        flexGrow: 1,
    }
});
