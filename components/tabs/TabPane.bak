import * as React from 'react'
import {ReactNode} from "react";
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import ScreenUtil from "../util/ScreenUtil";

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
        width: ScreenUtil.fullWidth(),
        height: ScreenUtil.fullHeight()
    }
});

export default TabPane;

