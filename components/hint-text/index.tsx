import * as React from 'react'
import {ReactNode} from 'react'
import {Text} from "react-native";
import Styles from "../style";
import ChungView from "../chung-view";

export interface HintTextProps {
    content: string;
    icon?: ReactNode;
}

export const HintText = ({ icon, content}: HintTextProps) => {
    const color = Styles.hintTextDefaultTextColor;
    return (
        <ChungView style={{
            borderColor:color,
            borderWidth: 1,
            padding: Styles.padding,
            marginVertical:Styles.margin
        }}>
            <Text style={[{color,lineHeight: 24}]}>
                {icon} {content}
            </Text>
        </ChungView>
    )
};
