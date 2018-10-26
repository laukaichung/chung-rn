import * as React from 'react'
import {ReactNode} from "react";
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import {ResolutionUtil} from "../util/ResolutionUtil";

interface TabPaneProps {
    children?: ReactNode;
    containerStyle: StyleProp<ViewStyle>
}

const TabPane = ({children, containerStyle}: TabPaneProps) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {children}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: ResolutionUtil.fullWidth(),
        height: ResolutionUtil.fullHeight()
    }
});

export default TabPane;

