import * as React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Styles} from "../style/Styles";

export interface CardBodyProps {
  style?: StyleProp<ViewStyle>;
  padding?:boolean
}

export default class CardBody extends React.Component<CardBodyProps, any> {
  public render() {
    const { style = {},padding, ...restProps } = this.props;
    return <View style={[styles.body, style,padding && {padding:Styles.padding}]} {...restProps} />;
  }
}

const styles = StyleSheet.create({
    body: {
        flexGrow: 1,
        minHeight: 48,
        borderTopWidth: Styles.borderWidth,
        borderColor: Styles.borderColor,
    }
});
