import * as React from 'react';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {ChungStyles} from "./index";
import ChungText from "./ChungText";


interface BadgeProps {
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    backgroundColor?: string;
    color?: string;
    children?: any;
}

const Badge = ({containerStyle, textStyle, children, backgroundColor, color}: BadgeProps) => {
    return (
        <View
            style={
                [
                    {
                        backgroundColor: backgroundColor || ChungStyles.primaryColor,
                        borderRadius: 5,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                    },
                    containerStyle
                ]}
        >
            <ChungText
                style={
                    [
                        {color: color || "#fff"},
                        textStyle
                    ]
                }
            >
                {children}
            </ChungText>
        </View>
    )
};

export default Badge;
