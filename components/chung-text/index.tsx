import * as React from 'react'
import {Text, TextProps} from "react-native";
import Styles from "../style";
import {ThemeContext} from "../theme-provider/ThemeContext";

interface ChungTextProps extends TextProps {
    children: any
    colors?:ChungTextColorProps
    oneColor?:string;
}

export interface ChungTextColorProps {
    light:string
    dark:string;
}

export const ChungText = (props: ChungTextProps) => {
    let {colors,oneColor} = props;
    return (
        <ThemeContext.Consumer>
            {
                ({theme})=> {

                    let color = oneColor || Styles.textColor;
                    if(colors) color = theme === "light"?colors.light:colors.dark;
                    return <Text {...props} style={[props.style, {lineHeight: 24}, {color}]}/>
                }
            }
        </ThemeContext.Consumer>
    )
};

export default ChungText;
