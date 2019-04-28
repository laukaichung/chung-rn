import * as React from 'react'
import {View, StyleSheet, StyleProp, ViewStyle} from "react-native";
import Styles from "./Styles";
import {ReactNode} from "react";
import {TestProps} from "./type";

interface WhiteSpaceProps extends TestProps{
    children?:ReactNode;
    size?:"sm"|"md"|"lg"
    center?:boolean;
    style?:StyleProp<ViewStyle>
}

const WhiteSpace = ({children, size, center, testID, style}: WhiteSpaceProps) => {
    let containerStyles:Array<StyleProp<ViewStyle>> = [];

    containerStyles.push(styles.whiteSpaceMd);
    if(size === "sm"){
        containerStyles.push(styles.whiteSpaceSm);
    }else if(size === "lg"){
        containerStyles.push(styles.whiteSpaceLg)
    }
    containerStyles.push(style);

    return (
        <View
            testID={testID}
            style={[center && {flex: 1, justifyContent: 'center', alignItems:'center'},containerStyles]}
        >
            {children}
        </View>
    )
};

const styles = StyleSheet.create({
    whiteSpaceMd:{
        marginVertical:Styles.margin
    },
    whiteSpaceLg:{
        marginVertical: Styles.marginLg,
    },
    whiteSpaceSm:{
        marginVertical:Styles.marginSm
    }
});

export default WhiteSpace;
