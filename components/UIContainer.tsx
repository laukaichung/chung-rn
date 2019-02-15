import * as React from 'react'
import UIContext from "./UIContext";
import Styles from "./Styles";
import {StyleProp, View, ViewStyle} from "react-native";
import ScreenUtil from "./util/ScreenUtil";
import {ReactNode} from "react";
import {SafeAreaView} from "react-navigation";

interface Props {
    children: ReactNode
    style: StyleProp<ViewStyle>
}

const UIContainer = ({style, ... restProps}: Props) => {
    return (
        <UIContext.Consumer>
            {
                ({theme, setLayout}) => {
                    return (
                        <View
                            {...restProps}
                            style={[{backgroundColor: Styles.backgroundColor, flex: 1}, style]}
                            onLayout={
                                ({nativeEvent: {layout}}) => {
                                    const headerHeight = ScreenUtil.fullHeight() - layout.height;
                                    setLayout({...layout, headerHeight});
                                }
                            }
                        />
                    )
                }
            }
        </UIContext.Consumer>
    )
};

export const UIDrawerContainer = (props) => {
    return (
        <UIContext.Consumer>
            {
                () => {
                    return (
                        <SafeAreaView>
                            <View
                                {...props}
                                style={{backgroundColor: Styles.backgroundColor, flex: 1}}
                            />
                        </SafeAreaView>
                    )
                }
            }
        </UIContext.Consumer>
    )
};

export default UIContainer;


