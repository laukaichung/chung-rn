import * as React from 'react'
import UIContext from "./UIContext";
import Styles from "./Styles";
import {View} from "react-native";

const UIContainer = (props) => {
    return (
        <UIContext.Consumer>
            {
                ({theme, setLayoutHeight}) => {
                    return (
                        <View
                            {...props}
                            style={{backgroundColor: Styles.backgroundColor, flex: 1}}
                            onLayout={({nativeEvent: {layout}})=>{
                                console.log(layout);
                                setLayoutHeight(layout.height);
                            }}
                        />
                    )
                }
            }
        </UIContext.Consumer>
    )
};

export default UIContainer;


