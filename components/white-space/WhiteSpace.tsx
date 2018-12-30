import * as React from 'react'
import {View, StyleSheet, StyleProp, ViewStyle} from "react-native";
import Styles from "../styles/Styles";
import {ReactNode} from "react";

interface WhiteSpaceProps {
    children?:ReactNode;
    size?:"sm"|"md"|"lg"
    center?:boolean;
    style?:StyleProp<ViewStyle>
}

const WhiteSpace = ({children,size,center,style}: WhiteSpaceProps) => {
    let containerStyles:Array<StyleProp<ViewStyle>> = [];

    containerStyles.push(styles.whiteSpaceMd);
    if(size === "sm"){
        containerStyles.push(styles.whiteSpaceSm);
    }else if(size === "lg"){
        containerStyles.push(styles.whiteSpaceLg)
    }
    containerStyles.push(style);

    return (
        <View style={[center && {flex: 1, justifyContent: 'center', alignItems:'center'},containerStyles]}>{children}</View>
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
