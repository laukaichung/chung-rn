import * as React from "react"
import {StyleProp, View, ViewStyle} from "react-native";
import Styles from "./Styles";
import {ReactNode} from "react";

interface DividerProps {
    style?: StyleProp<ViewStyle>
    children?: ReactNode;
    disabled?: boolean;
}

const Divider = ({style, disabled, children}: DividerProps) => {
    if(disabled){
        return children;
    }
    return (
        <React.Fragment>
            {children}
            <View
                style={
                    [
                        {
                            borderBottomColor: Styles.borderColor,
                            borderBottomWidth: Styles.borderWidth,
                        },
                        style
                    ]
                }
            />
        </React.Fragment>
    )
};

export default Divider;