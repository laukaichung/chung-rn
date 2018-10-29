import * as React from 'react'
import {ReactNode} from 'react'
import {Text, View} from "react-native";
import Styles from "../style";

export interface HintTextProps {
    content: string;
    color?:string;
    icon?: ReactNode;
}

export const HintText = ({color =  Styles.brandPrimary, icon, content}: HintTextProps) => {
    return (
        <View style={{
            borderColor:color,
            borderWidth: 1,
            padding: Styles.padding,
            marginVertical:Styles.margin
        }}>
            <Text style={[{color}, {lineHeight: 24}]}>
                {icon} {content}
            </Text>
        </View>
    )
};
