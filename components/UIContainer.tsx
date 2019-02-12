import * as React from 'react'
import UIContext from "./UIContext";
import Styles from "./Styles";
import {View} from "react-native";
import ScreenUtil from "./util/ScreenUtil";

interface Props {
    drawer?: boolean;
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
                                !props.drawer ? ({nativeEvent: {layout}}) => {
                                    const headerHeight = ScreenUtil.fullHeight() - layout.height;
                                    setLayout({...layout, headerHeight});
                                } : null}
                        />
                    )
                }
            }
        </UIContext.Consumer>
    )
};

export default UIContainer;


