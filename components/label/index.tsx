import * as React from 'react'
import {StyleSheet} from 'react-native'
import Styles from "../style";
import ChungText from "../chung-text";

interface LabelProps {
    content: string
}

const Label = ({content}: LabelProps) => {
    return (
        <ChungText style={styles.header}>{content}</ChungText>
    )
};

const styles = StyleSheet.create({
    header: {
        fontSize: Styles.HeaderFontSize,
        fontWeight: "bold"
    }
});

export default Label;
