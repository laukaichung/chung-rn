import * as React from 'react'
import {Text} from 'react-native'
import Styles from "../style";
import UIContext from "../ui-provider/UIContext";

interface HeaderProps {
    text: string
    center?: boolean
    marginVertical?: boolean
    fontSize?:number
}

export const Header = ({text, center,fontSize, marginVertical}: HeaderProps) => {
    return (
        <UIContext.Consumer>
            {
                ()=>
                <Text style={[
                    {
                        color: Styles.headerColor,
                        fontSize: fontSize || Styles.headerFontSize,
                        fontWeight: "bold",
                    },
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

// const styles = StyleSheet.create({
//     header: {
//
//     }
// });

export default Header
