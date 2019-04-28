import * as React from 'react'
import {StyleProp, TouchableOpacity, View, ViewStyle} from "react-native";
import Styles from "./Styles";
import Icon from "./Icon";
import PersistentDraggable from "./PersistentDraggable";
import ScreenUtil from "./util/ScreenUtil";
import {Component} from "react";
import {TestProps} from "./type";

export interface ActionButtonProps extends TestProps{
    bottom?: number;
    right?: number
    size?: number
    icon?: string;
    backgroundColor?: string
    iconColor?: string;
    onPress?: () => void;
    draggable?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    storageKey?: string;
}

export default class ActionButton extends Component<ActionButtonProps> {

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
            draggable, backgroundColor, storageKey, testID,
        } = this.props;

        const containerStyle = this.props.containerStyle ||
            [{
                position: 'absolute', bottom, right,

                /* Set elevation to 10 as button uses elevation:3
                 * Without this, the ActionButton would be overlapped by buttons.
                 *Setting zIndex doesn't work when button has elevation
                 */
                elevation: 10
            }]
        ;

        const iconView =
            <View
                testID={testID}
                style={
                    [
                        {
                            borderRadius: (size * 2) / 2,
                            width: size,
                            height: size,
                            backgroundColor,
                            justifyContent: 'center',
                            alignItems: 'center'
                        },
                    ]
                }
            >
                <Icon customSize={size * 0.6} color={iconColor || "#ffffff"} name={icon || "bars"}/>
            </View>;

        if (draggable) {
            return (
                <PersistentDraggable
                    onPress={onPress}
                    storageKey={storageKey}
                    boundary={{bottom: ScreenUtil.fullHeight(), top: 60}}
                    containerStyle={containerStyle}

                >
                    {iconView}
                </PersistentDraggable>
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


