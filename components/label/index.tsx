import * as React from 'react'
import {StyleSheet} from 'react-native'
import Styles from "../style";
import ChungText from "../chung-text";
import {ChungStyles} from "../index";

interface LabelProps {
    text?: string
    marginVertical?:boolean
    children?:string;
}

const Label = ({text,marginVertical,children}: LabelProps) => {
    return (
        <ChungText style={[styles.header,marginVertical && {marginVertical:ChungStyles.margin}]}>
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
