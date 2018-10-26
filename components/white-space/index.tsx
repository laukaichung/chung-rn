import * as React from 'react'
import {View,StyleSheet} from "react-native";
import {Styles} from "../style/Styles";
import {ReactNode} from "react";

interface WhiteSpaceProps {
    children?:ReactNode;
}

const WhiteSpace = ({children}: WhiteSpaceProps) => {
    return (
        <View style={styles.whiteSpace}>{children}</View>
    )
};

const styles = StyleSheet.create({
    whiteSpace:{
        marginVertical:Styles.margin
    }
});

export default WhiteSpace;
