import * as React from 'react'
import {ReactNode} from 'react'
import {StyleProp, TouchableWithoutFeedback, ViewStyle} from 'react-native';
import ChungView from "../chung-view";

export interface FlexItemProps {
    flex?: number;
    onPress?: () => void;
    onLongPress?: () => void;
    onPressIn?: () => void;
    onPressOut?: () => void;
    style?: StyleProp<ViewStyle>;
    marginRight?:boolean;
    disabled?: boolean;
    children?: ReactNode;
}

export default class FlexItem extends React.Component<FlexItemProps, any> {
    static defaultProps = {
        flex: 1,
    };

    render() {
        const {style, children, flex, ...restProps} = this.props;
        const flexItemStyle = {
            flex: flex || 1
        };

        const inner = (
            <ChungView style={[flexItemStyle, style]} {...restProps}>
                {children}
            </ChungView>
        );

        const shouldWrapInTouchableComponent =
            restProps.onPress ||
            restProps.onLongPress ||
            restProps.onPressIn ||
            restProps.onPressOut;

        if (!!shouldWrapInTouchableComponent) {
            return (
                <TouchableWithoutFeedback {...restProps}>
                    {inner}
                </TouchableWithoutFeedback>
            );
        } else {
            return inner;
        }
    }
}
