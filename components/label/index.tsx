import * as React from 'react'
import {StyleSheet} from 'react-native'
import Styles from "../style";
import ChungText from "../chung-text";
import {ChungStyles} from "../index";

interface LabelProps {
    text: string
    marginVertical?:boolean
}

const Label = ({text,marginVertical}: LabelProps) => {
    return (
        <ChungText style={[styles.header,marginVertical && {marginVertical:ChungStyles.margin}]}>
            {text}
        </ChungText>
    )
};

const styles = StyleSheet.create({
    header: {
        fontSize: Styles.HeaderFontSize,
        fontWeight: "bold"
    }
});

export default Label;
