import * as React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Styles} from "../style/Styles";

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
