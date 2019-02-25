import * as React from "react"
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Styles from "../Styles";

export type ArrowDirection = "up" | "down" | "left" | "right" | "up-right" | "up-left" | "down-right" | "down-left";
interface ToolTipArrowProps {
    direction: ArrowDirection;
    width: number;
    height: number;
    color: string;
    style?: StyleProp<ViewStyle>;
}

export default class ToolTipArrow extends React.Component<ToolTipArrowProps> {

    public static defaultProps: ToolTipArrowProps = {
        direction: 'up',
        width: 0,
        height: 0,
        color: Styles.fontColor,
    };

    public render() {
        const borderStyles = this._arrowBorderStyle();
        return (
            <View style={[styles.triangle, borderStyles, this.props.style]}/>
        )
    }

    private _arrowBorderStyle(): StyleProp<ViewStyle> {
        const {direction, width, height, color} = this.props;
        switch (direction) {
            case "up":
                return {
                    borderTopWidth: 0,
                    borderRightWidth: width / 2.0,
                    borderBottomWidth: height,
                    borderLeftWidth: width / 2.0,
                    borderTopColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderBottomColor: color,
                    borderLeftColor: 'transparent',
                };
            case "up-left":
                return {
                    borderTopWidth: height,
                    borderRightWidth: width,
                    borderBottomWidth: 0,
                    borderLeftWidth: 0,
                    borderTopColor: color,
                    borderRightColor: 'transparent',
                    borderBottomColor: 'transparent',
                    borderLeftColor: 'transparent',
                };
            case "up-right":
                return {
                    borderTopWidth: 0,
                    borderRightWidth: width,
                    borderBottomWidth: height,
                    borderLeftWidth: 0,
                    borderTopColor: 'transparent',
                    borderRightColor: color,
                    borderBottomColor: 'transparent',
                    borderLeftColor: 'transparent',
                };
            case "down":
                return {
                    borderTopWidth: height,
                    borderRightWidth: width / 2.0,
                    borderBottomWidth: 0,
                    borderLeftWidth: width / 2.0,
                    borderTopColor: color,
                    borderRightColor: 'transparent',
                    borderBottomColor: 'transparent',
                    borderLeftColor: 'transparent',
                };
            case "down-left":
                return {
                    borderTopWidth: height,
                    borderRightWidth: 0,
                    borderBottomWidth: 0,
                    borderLeftWidth: width,
                    borderTopColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderBottomColor: 'transparent',
                    borderLeftColor: color,
                };
            case "down-right":
                return {
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    borderBottomWidth: height,
                    borderLeftWidth: width,
                    borderTopColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderBottomColor: color,
                    borderLeftColor: 'transparent',
                };
            case "left":
                return {
                    borderTopWidth: height / 2.0,
                    borderRightWidth: width,
                    borderBottomWidth: height / 2.0,
                    borderLeftWidth: 0,
                    borderTopColor: 'transparent',
                    borderRightColor: color,
                    borderBottomColor: 'transparent',
                    borderLeftColor: 'transparent',
                };
            case "right":
                return {
                    borderTopWidth: height / 2.0,
                    borderRightWidth: 0,
                    borderBottomWidth: height / 2.0,
                    borderLeftWidth: width,
                    borderTopColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderBottomColor: 'transparent',
                    borderLeftColor: color,
                };
            default:
                return null;
        }
    }
}


const styles = StyleSheet.create({
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
    } as ViewStyle,
});

