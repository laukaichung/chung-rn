import * as React from 'react';
import {ReactNode, RefObject} from 'react';
import {Animated, View, ViewStyle} from 'react-native';
import {GestureHandlerProperties} from 'react-native-gesture-handler';
import Swipeable, {SwipeableProperties} from 'react-native-gesture-handler/Swipeable';
import ScreenUtil from "./util/ScreenUtil";

interface MenuItem {
   view: ReactNode
}

export interface CustomSwipeableProps extends SwipeableProperties, GestureHandlerProperties {
    rightView?: ReactNode;
    leftView?: ReactNode;
    rightMenu?: MenuItem[]
    rightMenuButtonWidth: number;
    rightContainerStyle?: ViewStyle;
    leftContainerStyle?: ViewStyle;
}

export default class CustomSwipeable extends React.Component<CustomSwipeableProps> {

    private swipeableRow: RefObject<Swipeable> = React.createRef();

    private _renderLeftActions = (progress, dragX) => {
        const {
            leftView, renderLeftActions,
            leftContainerStyle,
        } = this.props;
        const fullWidth = ScreenUtil.fullWidth();
        if (renderLeftActions) {
            return renderLeftActions(progress, dragX);

        } else if (leftView) {
            const trans = progress.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [ScreenUtil.fullWidth() / -1, (fullWidth / 2) / -1, 0],
            });
            return (
                <Animated.View
                    style={[
                        {
                            flex: 1,
                            transform: [{translateX: trans}],
                        },
                        leftContainerStyle
                    ]}
                >
                    {leftView}
                </Animated.View>
            );
        }
        return null;
    };

    private _renderRightActions = (progress, dragX) => {
        const {rightView, renderRightActions,
            rightContainerStyle, rightMenu, rightMenuButtonWidth = 80
        } = this.props;
        const fullWidth = ScreenUtil.fullWidth();
        if (renderRightActions) {

            return renderRightActions(progress, dragX);

        } else if (rightView) {

            const tranX = progress.interpolate({
                inputRange: [0, .5, 1],
                outputRange: [fullWidth, fullWidth / 2, 0],
            });

            return (
                <Animated.View
                    style={[
                        {
                            flex: 1,
                            transform: [{translateX: tranX}],
                        },
                        rightContainerStyle
                    ]}
                >
                    {rightView}
                </Animated.View>
            );

        }else if (rightMenu){
            const buttonsTotalWidth = rightMenuButtonWidth * rightMenu.length;
            return (
                <View style={{ width: buttonsTotalWidth, flexDirection: 'row' }}>
                    {
                        rightMenu.map((o, index)=>{

                            const trans = progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [buttonsTotalWidth - (rightMenuButtonWidth * index),  0],
                            });

                            return (
                                <Animated.View
                                    key={index}
                                    style={{ flex: 1, transform: [{ translateX: trans }] }}
                                >
                                    {o.view}
                                </Animated.View>
                            )

                        })
                    }
                </View>
            )
        }
        return null;
    };

    public _close = () => {
        this.swipeableRow.current.close();
    };

    public render() {
        return (
            <Swipeable
                ref={this.swipeableRow}
                friction={2}
                leftThreshold={30}
                rightThreshold={40}
                {...this.props}
                renderLeftActions={this._renderLeftActions}
                renderRightActions={this._renderRightActions}
            />
        );
    }
}
