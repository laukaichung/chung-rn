import * as React from 'react'
import {TextProps, TextStyle} from 'react-native'
import Styles from "./Styles";
import ChungText from "./ChungText";

interface HeaderProps extends TextProps{
    color?: string
    center?: boolean
    marginVertical?: boolean
    style?: TextStyle
    fontSize?: number
    children: string[] | string;
}

export const Header = ({color, center, fontSize, style, marginVertical, ...textProps}: HeaderProps) => {
    return (
        <ChungText
            style={[
                {
                    color: color || Styles.textColor,
                    fontSize: fontSize || Styles.headerFontSize,
                    fontWeight: "bold",
                },
                center && {textAlign: "center"},
                marginVertical && {marginVertical: Styles.margin * 2},
                style
            ]
            }
            {...textProps}
        />
    )
};

export default Header
