import * as React from 'react'
import {ReactNode} from 'react'
import {Text, View, ViewStyle} from "react-native";
import Styles from "./Styles";
import Icon from "./Icon";

export interface HintTextProps {
    children: ReactNode;
    icon?: string;
    color?: string;
    containerStyle?: ViewStyle
}

const HintText = ({color, icon, children, containerStyle}: HintTextProps) => {
    color = color || Styles.hintTextDefaultTextColor;
    return (
        <View style={[
            {
                borderColor: color,
                borderWidth: 1,
                padding: Styles.padding,
                marginVertical: Styles.margin
            },
            containerStyle,
            Styles.inline
        ]}>
            {icon && <Icon size={"sm"} color={color} style={{marginRight: Styles.margin}} name={icon}/>}
            <Text style={[{lineHeight: 24, color}]}>
                {children}
            </Text>
        </View>
    )
};

export default HintText
