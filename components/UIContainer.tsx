import * as React from 'react'
import UIContext from "./UIContext";
import Styles from "./Styles";
import {View} from "react-native";
import ScreenUtil from "./util/ScreenUtil";
import {ReactNode} from "react";
import {SafeAreaView} from "react-navigation";

interface Props {
    children: ReactNode
}

const UIContainer = (props: Props) => {
    return (
        <UIContext.Consumer>
            {
                ({theme, setLayout}) => {
                    return (
                        <View
                            {...props}
                            style={{backgroundColor: Styles.backgroundColor, flex: 1}}
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


