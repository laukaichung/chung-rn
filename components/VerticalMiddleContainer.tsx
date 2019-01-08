import * as React from 'react'
import {StyleProp, View, ViewStyle} from "react-native";
import {ReactNode} from "react";

interface VerticalMiddleContainerProps {
    children:ReactNode;
    style?:StyleProp<ViewStyle>
}

const VerticalMiddleContainer = ({children,style}: VerticalMiddleContainerProps) => {
    return (
        <View style={[{flexDirection: 'row', alignItems: 'center'},style]}>
            {children}
        </View>
    )
};

export default VerticalMiddleContainer;
