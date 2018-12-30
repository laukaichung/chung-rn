import * as React from 'react'
import {ReactNode} from 'react'
import {Text, ViewStyle} from "react-native";
import Styles from "./Styles";
import ChungView from "./ChungView";

export interface HintTextProps {
    children: ReactNode;
    icon?: ReactNode;
    color?: string;
    containerStyle?: ViewStyle
}

const HintText = ({color, icon, children, containerStyle}: HintTextProps) => {
    color = color || Styles.hintTextDefaultTextColor;
    return (
        <ChungView style={[
            {
                borderColor: color,
                borderWidth: 1,
                padding: Styles.padding,
                marginVertical: Styles.margin
            },
            containerStyle
        ]}>
            <Text style={[{lineHeight: 24, color}]}>
                {icon} {children}
            </Text>
        </ChungView>
    )
};

export default HintText
