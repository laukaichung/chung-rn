import * as React from "react"
import {StyleProp, View, ViewStyle} from "react-native";
import Styles from "./Styles";

interface DividerProps {
    style?: StyleProp<ViewStyle>
}

const Divider = ({style}: DividerProps) => {
    return (
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
    )
};

export default Divider;