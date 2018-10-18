import * as React from 'react'
import {StyleSheet, Text} from 'react-native'
import {Styles} from "../style/Styles";
import {WhiteSpace} from "../whitespace/WhiteSpace";

interface HeaderProps {
    header: string
}

export const Header = ({header}: HeaderProps) => {
    return (
        <React.Fragment>
            <Text style={styles.header}>{header}</Text>
            <WhiteSpace/>
        </React.Fragment>

    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: Styles.header,
        fontWeight: "bold"
    }
})
