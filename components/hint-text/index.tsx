import * as React from 'react'
import {ReactNode} from 'react'
import {Text} from "react-native";
import Styles from "../style";
import ChungView from "../chung-view";
import UIContext from "../ui-provider/UIContext";

export interface HintTextProps {
    content: string;
    icon?: ReactNode;
    color?: string;
}

export const HintText = ({color, icon, content}: HintTextProps) => {
    return (
        <UIContext.Consumer>
            {
                ({isDarkMode}) => {
                    color = color || Styles.hintTextDefaultTextColor;
                    return (
                        <ChungView style={{
                            borderColor: color,
                            borderWidth: 1,
                            padding: Styles.padding,
                            marginVertical: Styles.margin
                        }}>
                            <Text style={[{lineHeight: 24,color}]}>
                                {icon} {content}
                            </Text>
                        </ChungView>
                    )
                }
            }
        </UIContext.Consumer>
    )
};
