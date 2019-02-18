import * as React from 'react'
import {ReactNode} from 'react'
import {ViewStyle} from "react-native";
import Styles from "./Styles";
import Icon from "./Icon";
import FlexItem from "./FlexItem";
import Flex from "./Flex";
import ChungText from "./ChungText";

export interface HintTextProps {
    children: ReactNode;
    icon?: string;
    color?: string;
    containerStyle?: ViewStyle
}

const HintText = ({color, icon, children, containerStyle}: HintTextProps) => {
    color = color || Styles.hintTextDefaultTextColor;
    return (
        <Flex style={[
            {
                borderColor: color,
                borderWidth: 1,
                padding: Styles.padding,
                marginVertical: Styles.margin
            },
            containerStyle,
        ]}>
            {
                icon &&
                <FlexItem>
                    <Icon color={color} style={{marginRight: Styles.margin}} name={icon}/>
                </FlexItem>
            }
            <FlexItem flex={5}>
                <ChungText
                    style={
                        [
                            {
                                color,
                                lineHeight: Styles.lineHeight
                            }
                        ]
                    }
                >
                    {children}
                </ChungText>
            </FlexItem>
        </Flex>
    )
};

export default HintText
