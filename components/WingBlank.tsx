import * as React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import Styles from "./Styles";
import {ChungStyles} from "./index";
import {ReactNode} from "react";

export interface WingBlankProps {
    style?: StyleProp<ViewStyle>;
    size?: 'sm' | 'md' | 'lg';
    marginVertical?: boolean
    children: ReactNode;
}

const WingBlank = ({size = "md", style, children, marginVertical}: WingBlankProps) => {

    let margin = Styles.margin;
    if (size === "sm") {
        margin = Styles.marginSm
    } else if (size === "lg") {
        margin = Styles.marginLg;
    }
    return (
        <View style={[{marginHorizontal: margin, marginVertical: marginVertical ? ChungStyles.margin : null}, style]}>
            {children}
        </View>
    );

}

export default WingBlank;
