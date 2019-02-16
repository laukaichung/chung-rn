import * as React from 'react';
import {ReactNode, RefObject} from 'react';
import {Animated, ViewStyle} from 'react-native';
import {RectButton, GestureHandlerProperties} from 'react-native-gesture-handler';
import Swipeable, {SwipeableProperties} from 'react-native-gesture-handler/Swipeable';
import ScreenUtil from "./util/ScreenUtil";

export interface CustomSwipeableProps extends SwipeableProperties, GestureHandlerProperties {
    rightView?: ReactNode;
    leftView?: ReactNode;
    rightContainerStyle?: ViewStyle;
    leftContainerStyle?: ViewStyle;
    onRightViewPress?: ()=> void;
    onLeftViewPress?: ()=> void;
}

export default class CustomSwipeable extends React.Component<CustomSwipeableProps> {

    private swipeableRow: RefObject<Swipeable> = React.createRef();

    private _renderLeftActions = (progress, dragX) => {
        const {
            leftView, renderLeftActions,
            leftContainerStyle, onLeftViewPress,
        } = this.props;
        const fullWidth = ScreenUtil.fullWidth();
        if (renderLeftActions) {
            return renderLeftActions(progress, dragX);

        } else if(leftView) {
            const trans = progress.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [ScreenUtil.fullWidth() /-1, (fullWidth/2) / -1 , 0],
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
                    <RectButton
                        onPress={()=> {
                            onLeftViewPress();
                            this._close();
                        }}
                    >
                        {leftView}
                    </RectButton>
                </Animated.View>
            );
        }
        return null;
    };

    private _renderRightActions = (progress, dragX) => {
        const {rightView, renderRightActions, rightContainerStyle, onRightViewPress} = this.props;
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
                    <RectButton
                        onPress={()=>{
                            onRightViewPress();
                            this._close();
                        }}
                    >
                        {rightView}
                    </RectButton>
                </Animated.View>
            );
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
