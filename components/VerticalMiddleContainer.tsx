import * as React from 'react'
import {StyleProp, View, ViewStyle} from "react-native";
import {ReactNode} from "react";
import {TestProps} from "./type";

interface VerticalMiddleContainerProps extends TestProps {
    children:ReactNode;
    style?:StyleProp<ViewStyle>
}

const VerticalMiddleContainer = ({children, testID, style}: VerticalMiddleContainerProps) => {
    return (
        <View testID={testID} style={[{flexDirection: 'row', alignItems: 'center'},style]}>
            {children}
        </View>
    )
};

export default VerticalMiddleContainer;
