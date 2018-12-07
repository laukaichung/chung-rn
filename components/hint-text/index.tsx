import * as React from 'react'
import {ReactNode} from 'react'
import {Text, ViewStyle} from "react-native";
import Styles from "../style";
import ChungView from "../chung-view";
import UIContext from "../ui-provider/UIContext";

export interface HintTextProps {
    text: string;
    icon?: ReactNode;
    color?: string;
    containerStyle?: ViewStyle
}

const HintText = ({color, icon, text,containerStyle}: HintTextProps) => {
    return (
        <UIContext.Consumer>
            {
                ({isDarkMode}) => {
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
                                {icon} {text}
                            </Text>
                        </ChungView>
                    )
                }
            }
        </UIContext.Consumer>
    )
};

export default HintText
