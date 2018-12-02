import * as React from 'react'
import {StyleSheet, Text} from 'react-native'
import Styles from "../style";

interface HeaderProps {
    content: string
    center?:boolean
    marginVertical?:boolean
}

export const Header = ({content,center,marginVertical}: HeaderProps) => {
    return (
        <React.Fragment>
            <Text style={[styles.header,center && {textAlign:"center"},marginVertical && {marginVertical:Styles.margin * 2}]}>{content}</Text>
        </React.Fragment>

    )
};

const styles = StyleSheet.create({
    header: {
        fontSize: Styles.HeaderFontSize,
        fontWeight: "bold",
        color: Styles.headerColor,
    }
});

export default Header
