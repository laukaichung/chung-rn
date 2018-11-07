import * as React from 'react'
import {View, StyleSheet, StyleProp, ViewStyle} from "react-native";
import Styles from "../style";
import {ReactNode} from "react";

interface WhiteSpaceProps {
    children?:ReactNode;
    size?:"sm"|"md"|"lg"
    center?:boolean;
    containerStyle?:StyleProp<ViewStyle>
}

const WhiteSpace = ({children,size,center,containerStyle}: WhiteSpaceProps) => {

    let style = styles.whiteSpaceMd;
    if(size === "sm"){
        style = styles.whiteSpaceSm;
    }else if(size === "lg"){
        style = styles.whiteSpaceLg
    }

    return (
        <View style={[containerStyle,style,center && Styles.centerItems]}>{children}</View>
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
