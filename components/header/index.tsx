import * as React from 'react'
import {StyleSheet, Text} from 'react-native'
import Styles from "../style";
import UIContext from "../ui-provider/UIContext";

interface HeaderProps {
    text: string
    center?: boolean
    marginVertical?: boolean
}

export const Header = ({text, center, marginVertical}: HeaderProps) => {
    return (
        <UIContext.Consumer>
            {
                ()=>
                <Text style={[
                    {color: Styles.headerColor},
                    styles.header,
                    center && {textAlign: "center"},
                    marginVertical && {marginVertical: Styles.margin * 2}
                ]
                }>
                    {text}
                </Text>
            }
        </UIContext.Consumer>
    )
};

const styles = StyleSheet.create({
    header: {
        fontSize: Styles.headerFontSize,
        fontWeight: "bold",
    }
});

export default Header
