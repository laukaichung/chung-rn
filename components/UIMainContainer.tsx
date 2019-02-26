import * as React from 'react'
import {ReactNode} from 'react'
import UIContext from "./UIContext";
import Styles from "./Styles";
import {StyleProp, View, ViewStyle} from "react-native";
import {SafeAreaView} from "react-navigation";

interface Props {
    children: ReactNode
    style?: StyleProp<ViewStyle>
}


const UIMainContainer = ({style, ... restProps}: Props) => {
    return (
        <UIContext.Consumer>
            {
                ({theme}) => {
                    return (
                        <View
                            {...restProps}
                            style={[{backgroundColor: Styles.backgroundColor, flex: 1}, style]}
                            // onLayout={
                            //     ({nativeEvent: {layout}}) => {
                            //         const headerHeight = ScreenUtil.fullHeight() - layout.height;
                            //         setLayout({...layout, headerHeight});
                            //     }
                            // }
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

export default UIMainContainer;


