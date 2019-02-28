import * as React from "react"
import {GestureResponderEvent, StyleProp, TouchableWithoutFeedback, View, ViewStyle} from "react-native";
import ScreenUtil from "./util/ScreenUtil";
import Styles from "./Styles";
import {ReactNode} from "react";

export interface OverlayProps {
    onPress: (e?: GestureResponderEvent) => void;
    enabled: boolean;
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
}


const Overlay = ({style, enabled, children, onPress}: OverlayProps) => {

    if (!enabled) {
        return children as any;
    }

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
        >
            <View
                style={
                    [
                        {
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: ScreenUtil.fullWidth(),
                            height: "100%",
                            //flex: 1,
                            backgroundColor: Styles.overlayBackgroundColor,
                        },
                        style
                    ]
                }
            >
                {children}
            </View>
        </TouchableWithoutFeedback>
    )
};

export default Overlay;