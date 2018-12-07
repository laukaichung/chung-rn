import * as React from 'react'
import {Text, TextStyle} from 'react-native'
import Styles from "../style";
import UIContext from "../ui-provider/UIContext";

interface HeaderProps {
    text?: string
    color?:string
    center?: boolean
    marginVertical?: boolean
    style?:TextStyle
    fontSize?:number
    children?:string;
}

export const Header = ({text, color,center,children,fontSize, style,marginVertical}: HeaderProps) => {
    return (
        <UIContext.Consumer>
            {
                ()=>
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
                    {children || text}
                </Text>
            }
        </UIContext.Consumer>
    )
};

export default Header
