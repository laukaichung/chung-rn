import * as React from 'react'
import {StyleProp, StyleSheet, TextStyle} from 'react-native'
import Styles from "./Styles";
import ChungText from "./ChungText";
import {ReactNode} from "react";

interface LabelProps {
    marginVertical?:boolean
    children?:ReactNode;
    style?:StyleProp<TextStyle>;
}

const Label = ({marginVertical,children,style}: LabelProps) => {
    return (
        <ChungText style={[styles.header,marginVertical && {marginVertical:Styles.margin},style]}>
            {children}
        </ChungText>
    )
};

const styles = StyleSheet.create({
    header: {
        fontSize: Styles.labelFontSize,
        fontWeight: "bold"

    }
});

export default Label;
