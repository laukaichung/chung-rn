import * as React from 'react'
import {Text, TextProps} from "react-native";
import Styles from "../style";
import {UIContext} from "../ui-provider/UIContext";

interface ChungTextProps extends TextProps {
    children: any
    color?:string;
}

export const ChungText = (props: ChungTextProps) => {
    let {color} = props;
    return (
        <UIContext.Consumer>
            {
                ({theme})=> {
                    color = color || Styles.textColor;
                    return <Text {...props} style={[props.style, {lineHeight: 24}, {color}]}/>
                }
            }
        </UIContext.Consumer>
    )
};

export default ChungText;
