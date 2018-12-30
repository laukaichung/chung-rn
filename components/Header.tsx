import * as React from 'react'
import {Text, TextStyle} from 'react-native'
import Styles from "./Styles";

interface HeaderProps {
    color?: string
    center?: boolean
    marginVertical?: boolean
    style?: TextStyle
    fontSize?: number
    children?: string;
}

export const Header = ({color, center, children, fontSize, style, marginVertical}: HeaderProps) => {
    return (

        <Text style={[
            {
                color: color || Styles.headerColor,
                fontSize: fontSize || Styles.headerFontSize,
                fontWeight: "bold",
            },
            center && {textAlign: "center"},
            marginVertical && {marginVertical: Styles.margin * 2},
            style
        ]
        }>
            {children}
        </Text>

    )
};

export default Header
