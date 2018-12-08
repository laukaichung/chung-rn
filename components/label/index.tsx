import * as React from 'react'
import {StyleSheet,Text, TextStyle} from 'react-native'
import Styles from "../style";
import {ChungStyles} from "../index";
import ChungText from "../chung-text";

interface LabelProps {
    text?: string
    marginVertical?:boolean
    children?:string;
    style?:TextStyle;
}

const Label = ({text,marginVertical,children,style}: LabelProps) => {
    return (
        <ChungText style={[styles.header,marginVertical && {marginVertical:ChungStyles.margin},style]}>
            {children || text}
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
