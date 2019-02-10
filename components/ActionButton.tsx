import * as React from 'react'
import {StyleProp, TouchableOpacity, View, ViewStyle} from "react-native";
import Styles from "./Styles";
import Icon from "./Icon";
import DraggableActionButton from "./DraggableActionButton";

export interface ActionButtonProps {
    bottom?: number;
    right?: number
    size?: number
    icon?: string;
    backgroundColor?: string
    iconColor?: string;
    onPress?: () => void;
    draggable?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
}

export default class ActionButton extends React.Component<ActionButtonProps> {

    public static defaultProps: ActionButtonProps = {
        bottom: Styles.margin * 3,
        right: Styles.margin * 3,
        draggable: true,
        backgroundColor: Styles.secondaryColor,
        size: Styles.actionButtonSizeMd,
    };

    public render() {
        const {
            bottom, right, onPress, icon, iconColor, size,
            draggable, backgroundColor,
        } = this.props;

        let containerStyle = this.props.containerStyle ||
            {position: 'absolute', bottom, right, zIndex: Styles.toastZIndex}
        ;

        const iconView =
            <View
                style={
                    [
                        {
                            borderRadius: (size * 2) / 2,
                            width: size,
                            height: size,
                            backgroundColor,
                        },
                        Styles.centerItems
                    ]
                }
            >
                <Icon customSize={size * 0.6} color={iconColor || "#ffffff"} name={icon || "bars"}/>
            </View>;

        if (draggable) {
            return (
                <DraggableActionButton
                    {...this.props}
                    containerStyle={containerStyle}
                    view={iconView}
                />
            )
        }

        return (
            <TouchableOpacity
                onPress={onPress}
                style={containerStyle}
            >
                {iconView}
            </TouchableOpacity>
        )
    }
}


