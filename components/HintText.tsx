import * as React from 'react'
import {ReactNode} from 'react'
import {View, ViewStyle} from "react-native";
import Styles from "./Styles";
import Icon from "./Icon";
import ChungText from "./ChungText";
import {TestProps} from "./type";

export interface HintTextProps extends TestProps{
    children: ReactNode;
    icon?: string;
    color?: string;
    containerStyle?: ViewStyle
}

const HintText = ({color, icon, children, testID, containerStyle}: HintTextProps) => {
    color = color || Styles.hintTextDefaultTextColor;
    return (
        <View
            style={[
                {
                    padding: Styles.padding,
                    marginVertical: Styles.margin,
                    flexDirection: "row",
                    justifyContent: "flex-start"
                },
                containerStyle,
            ]}
            testID={testID}
        >
            {
                icon &&
                <View style={{justifyContent: "center"}}>
                    <Icon
                        color={color}
                        style={{marginRight: Styles.margin}}
                        name={icon}
                    />
                </View>
            }
            <ChungText
                style={
                    [
                        {
                            color,
                            lineHeight: Styles.lineHeight,
                            flex: 1,
                            flexWrap: "wrap",
                        }
                    ]
                }
            >
                {children}
            </ChungText>
        </View>
    )
};

export default HintText
