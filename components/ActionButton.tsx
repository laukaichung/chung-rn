import * as React from 'react'
import {TouchableOpacity} from "react-native";
import {ChungStyles} from "./index";
import Styles from "./Styles";
import Icon from "./Icon";

export interface ActionButtonProps {
    bottom?: number;
    right?: number
    size?: number
    icon: string;
    buttonBackgroundColor: string
    onPress?: () => void;
}

const ActionButton = ({bottom, onPress, buttonBackgroundColor, right, icon, size = 56}: ActionButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                {
                    position: 'absolute',
                    bottom: bottom || ChungStyles.margin * 4,
                    right: right || ChungStyles.margin * 4,
                    borderRadius: (size * 2) / 2,
                    width: size,
                    height: size,
                    backgroundColor: buttonBackgroundColor || ChungStyles.primaryColor,
                },
                Styles.centerItems
            ]}
        >
            <Icon customSize={size * 0.6} name={icon || "bars"}/>
        </TouchableOpacity>
    )
};

export default ActionButton
