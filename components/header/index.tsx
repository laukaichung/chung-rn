import * as React from 'react'
import {StyleSheet} from 'react-native'
import Styles from "../style";
import ChungText from "../chung-text";

interface HeaderProps {
    content: string
    center?:boolean
    marginVertical?:boolean
}

export const Header = ({content,center,marginVertical}: HeaderProps) => {
    return (
        <ChungText
            colors={{
                light:Styles.primaryColorLight,
                dark:Styles.primaryColorDark
            }}
            style={[styles.header,center && {textAlign:"center"},marginVertical && {marginVertical:Styles.margin * 2}]}
        >
            {content}
        </ChungText>
    )
};

const styles = StyleSheet.create({
    header: {
        fontSize: Styles.HeaderFontSize,
        fontWeight: "bold",
    }
});

export default Header
