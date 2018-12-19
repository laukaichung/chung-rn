import * as React from 'react'
import {StyleProp, StyleSheet, TextStyle} from 'react-native'
import Styles from "../style";
import ChungText from "../chung-text";

interface LabelProps {
    marginVertical?:boolean
    children?:string;
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
        fontSize: Styles.headerFontSize,
        fontWeight: "bold"

    }
});

export default Label;
