import * as React from 'react'
import {TextStyle} from 'react-native'
import Styles from "./Styles";
import ChungText from "./ChungText";

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

        <ChungText style={[
            {
                color: color || Styles.textColor,
                fontSize: fontSize || Styles.headerFontSize,
                fontWeight: "bold",
            },
            center && {textAlign: "center"},
            marginVertical && {marginVertical: Styles.margin * 2},
            style
        ]
        }>
            {children}
        </ChungText>

    )
};

export default Header
