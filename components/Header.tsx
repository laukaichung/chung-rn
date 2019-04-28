import * as React from 'react'
import {TextProps, TextStyle} from 'react-native'
import Styles from "./Styles";
import ChungText from "./ChungText";
import Icon, {IconProps} from "./Icon";
import {TestProps} from "./type";

interface HeaderProps extends TextProps, TestProps {
    color?: string
    center?: boolean
    marginVertical?: boolean
    style?: TextStyle
    fontSize?: number
    children: string[] | string;
    iconProps?: IconProps;
}

const Header = ({color, center, fontSize, iconProps, style, marginVertical, ...restProps}: HeaderProps) => {
    const header = (
            <ChungText
                style={[
                    {
                        color: color || Styles.fontColor,
                        fontSize: fontSize || Styles.headerFontSize,
                        fontWeight: "bold",
                    },
                    center && {textAlign: "center"},
                    marginVertical && {marginVertical: Styles.margin * 2},
                    style
                ]
                }
                {...restProps}
            />
    );
    
    if(iconProps){
        return (
            <ChungText>
                {header} <Icon style={{marginLeft: Styles.margin}} {...iconProps}/>
            </ChungText>
        )
    }else {
        return header;
    }
    
    
};

export default Header
