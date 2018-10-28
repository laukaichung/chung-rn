import * as React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Styles} from "../style/Styles";

export interface CardBodyProps {
  style?: StyleProp<ViewStyle>;
}

export default class CardBody extends React.Component<CardBodyProps, any> {
  public render() {
    const { style = {}, ...restProps } = this.props;
    return <View style={[styles.body, style]} {...restProps} />;
  }
}

const styles = StyleSheet.create({
    body: {
        flexGrow: 1,
        padding: Styles.padding,
        minHeight: 48,
        borderTopWidth: Styles.borderWidth,
        borderColor: Styles.borderColor,
    }
});
