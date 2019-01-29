import * as React from 'react';
import {RefObject} from 'react';
import {Animated, StyleProp, TouchableHighlight, View, ViewProps} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable, {SwipeableProperties} from 'react-native-gesture-handler/Swipeable';
import {IconProps, StatefulIcon} from "./Icon";
import Styles from "./Styles";

const AnimatedIcon = Animated.createAnimatedComponent(StatefulIcon);

export interface CustomSwipeableProps extends SwipeableProperties {
    rightMenuList?: IconProps[];
    rightContainerStyle?: StyleProp<ViewProps>;
    leftContainerStyle?: StyleProp<ViewProps>;
    leftMenuList?: IconProps[];
}

export default class CustomSwipeable extends React.Component<CustomSwipeableProps> {

    private swipeableRow: RefObject<Swipeable> = React.createRef();

    renderLeftActions = (progress, dragX) => {
        const {leftMenuList, renderLeftActions, leftContainerStyle} = this.props;
        if (renderLeftActions) {
            return renderLeftActions(progress, dragX);
        } else if (leftMenuList) {
            const scale = dragX.interpolate({
                inputRange: [0, 80],
                outputRange: [0, 1],
                extrapolate: 'clamp',
            });
            return (

                <TouchableHighlight
                    style={[Styles.swipeableContainer, leftContainerStyle]}
                    onPress={this.close}
                >
                    <View>
                        {
                            leftMenuList.map((o, idx) => {
                                return (
                                    <AnimatedIcon
                                        key={idx} {...o}
                                        style={[{transform: [{scale}]}]}
                                    />
                                )
                            })
                        }
                    </View>
                </TouchableHighlight>
            );
        }
    };

    renderRightActions = (progress, dragX) => {
        const {rightMenuList, renderRightActions, rightContainerStyle} = this.props;
        if (renderRightActions) {
            return renderRightActions(progress, dragX);
        } else if (rightMenuList) {
            const scale = dragX.interpolate({
                inputRange: [-80, 0],
                outputRange: [1, 0],
                extrapolate: 'clamp',
            });
            return (
                <TouchableHighlight
                    style={[Styles.swipeableContainer, rightContainerStyle]}
                    onPress={this.close}
                >
                    <View>
                        {
                            rightMenuList.map((o, idx) => {
                                return (
                                    <AnimatedIcon
                                        key={idx} {...o}
                                        style={[{transform: [{scale}]}]}
                                    />
                                )
                            })
                        }
                    </View>
                </TouchableHighlight>
            );
        }
    };

    close = () => {
        this.swipeableRow.current.close();
    };

    render() {
        return (
            <Swipeable
                ref={this.swipeableRow}
                friction={2}
                //leftThreshold={80}
                //rightThreshold={40}
                {...this.props}
                renderLeftActions={this.renderLeftActions}
                renderRightActions={this.renderRightActions}
            />
        );
    }
}
