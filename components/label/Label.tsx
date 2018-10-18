import * as React from 'react'
import {StyleSheet, Text} from 'react-native'
import {Styles} from "../style/Styles";

interface LabelProps {
    content: string
}

export const Label = ({content}: LabelProps) => {
    return (
        <Text style={styles.header}>{content}</Text>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: Styles.header,
        fontWeight: "bold"
    }
})
