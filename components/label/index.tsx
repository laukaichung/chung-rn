import * as React from 'react'
import {StyleSheet} from 'react-native'
import Styles from "../style";
import ChungText from "../chung-text";
import {ChungStyles} from "../index";

interface LabelProps {
    content: string
    marginVertical?:boolean
}

const Label = ({content,marginVertical}: LabelProps) => {
    return (
        <ChungText style={[styles.header,marginVertical && {marginVertical:ChungStyles.margin}]}>
            {content}
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
