import * as React from 'react'
import {StyleSheet, Text} from 'react-native'
import Styles from "../style";

interface LabelProps {
    content: string
}

const Label = ({content}: LabelProps) => {
    return (
        <Text style={styles.header}>{content}</Text>
    )
};

const styles = StyleSheet.create({
    header: {
        fontSize: Styles.fontSizeHeading,
        fontWeight: "bold"
    }
});

export default Label;
