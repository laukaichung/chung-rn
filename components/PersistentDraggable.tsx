import * as React from "react"
import {Component} from "react"
import {Animated, StyleProp, ViewStyle} from "react-native";
import {PanGestureHandler, RectButton, State} from 'react-native-gesture-handler';
import Toast from "./Toast";
import AsyncStorage from '@react-native-community/async-storage';

interface Props {
    boundary?: {top: number, bottom: number};
    containerStyle?: StyleProp<ViewStyle>;
    storageKey?: string;
    onPress?: () => void;
}

interface DraggableState {
    loaded: boolean
    enabled: boolean;
}

interface OffsetState {
    x: number;
    y: number;
}

export default class PersistentDraggable extends Component<Props, DraggableState> {
    public state: DraggableState = {loaded: false, enabled: true};
    private _translateXY = new Animated.ValueXY({x: 0, y: 0});
    private _lastOffset: OffsetState = {x: 0, y: 0};
    private mounted: boolean;
    private _onGestureEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: this._translateXY.x,
                    translationY: this._translateXY.y,
                },
            },
        ],
        {useNativeDriver: true}
    );

    private _onHandlerStateChange = async ({nativeEvent}) => {
        const {boundary} = this.props;
        if (nativeEvent.oldState === State.ACTIVE) {
            this._lastOffset.x += nativeEvent.translationX;
            if(boundary) {
                if (nativeEvent.absoluteY < (boundary.bottom) && nativeEvent.absoluteY > (boundary.top)) {
                    this._lastOffset.y += nativeEvent.translationY;
                }
            }else{
                this._lastOffset.y += nativeEvent.translationY;
            }
            this._translateXY.setOffset(this._lastOffset);
            this._translateXY.setValue({x: 0, y: 0});
            const {storageKey} = this.props;

            if (storageKey) {
                await AsyncStorage.setItem(storageKey, JSON.stringify(this._lastOffset));
            }
        }
    };

    public render() {
        const {loaded, enabled} = this.state;
        if (!loaded) {
            return null;
        }
        const {children, onPress, containerStyle} = this.props;
        return (
            <PanGestureHandler
                {...this.props}
                enabled={enabled}
                onGestureEvent={this._onGestureEvent}
                onHandlerStateChange={this._onHandlerStateChange}
            >
                <Animated.View
                    style={[
                        {
                            transform: [
                                {translateX: this._translateXY.x},
                                {translateY: this._translateXY.y},
                            ],

                        },
                        containerStyle,
                    ]}
                >
                    <RectButton onPress={onPress}>
                        {children}
                    </RectButton>
                </Animated.View>
            </PanGestureHandler>
        );
    }


    public async componentDidMount() {
        this.mounted = true;
        // const {boundary: {top, bottom}} = this.props;
        // this._translateXYListenerId = this._translateXY.addListener(({x, y}) => {
        //
        //     if(this.absoluteY > bottom){
        //         console.log('should stop!')
        //         this.setState({enabled: false})
        //     }
        //     // if(y > bottom){
        //     //     this.setState({enabled: false})
        //     // }
        // });

        const {storageKey} = this.props;
        if (storageKey) {
            const dataStr = await AsyncStorage.getItem(storageKey);
            if (dataStr) {
                try {
                    this._lastOffset = JSON.parse(dataStr);
                    /*
                     * The offset and values MUST be set in order as follows.
                     * First setOffset, then setValue!
                     */
                    this._translateXY.setOffset(this._lastOffset);
                    this._translateXY.setValue({x: 0, y: 0});

                } catch (e) {
                    Toast.fail({content: `Failure to parse the last X and Y positions for ActionButton`})
                }
            }
        }
        if(this.mounted) {
            this.setState({loaded: true})
        }
    }

    public componentWillUnmount() {
        // this._translateXY.removeListener(this._translateXYListenerId);
        this.mounted = false;

    }
}