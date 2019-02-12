import * as React from 'react'
import {NavigationProps} from "../demotype";
import {View, StyleSheet, Animated, TouchableWithoutFeedback} from "react-native";
import ChungText from "../../ChungText";
import ValueXY = Animated.ValueXY;

export default class TestScreen extends React.Component<NavigationProps> {
    moveAnimation: ValueXY;
    constructor(props) {
        super(props);
        this.moveAnimation = new Animated.ValueXY({ x: 10, y: 450 })
    }

    _moveBall = () => {
        Animated.sequence([
            Animated.spring(this.moveAnimation, {
                toValue: {x: 250, y: 10},
                useNativeDriver: true
            }),
            Animated.spring(this.moveAnimation, {
                toValue: {x: 100, y: 10},
                useNativeDriver: true
            }),
        ]).start();
    };

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={
                    [
                        styles.tennisBall,
                        {
                            transform: [
                                {translateX: this.moveAnimation.x},
                                {translateY: this.moveAnimation.y},
                            ],
                        }
                    ]
                }>
                    <TouchableWithoutFeedback style={styles.button} onPress={this._moveBall}>
                        <ChungText style={styles.buttonText}>
                            Press
                        </ChungText>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    tennisBall: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'greenyellow',
        borderRadius: 100,
        width: 100,
        height: 100,
    },
    button: {
        paddingTop: 24,
        paddingBottom: 24,
    },
    buttonText: {
        fontSize: 24,
        color: '#333',
    }
});