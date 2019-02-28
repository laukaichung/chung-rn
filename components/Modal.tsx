import * as React from 'react';
import {createRef, ReactNode, RefObject} from 'react';
import {
    BackHandler,
    Keyboard,
    StyleProp,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ViewStyle
} from 'react-native'
import Styles from "./Styles";
import Overlay, {OverlayProps} from "./Overlay";
import Portal from "./portal/Portal";
import * as Animatable from "react-native-animatable";
import ScreenUtil from "./util/ScreenUtil";

export interface ModalCallback {
    closeModal: () => void;
}

export interface ModalProps {
    nonButtonTrigger?: ReactNode;
    buttonTrigger?: any;
    fullScreen?: boolean;
    containerStyle?: StyleProp<ViewStyle>
}

interface CustomModalCoreProps extends ModalProps {
    children: (callback: ModalCallback) => ReactNode;
}

interface State {
    isVisible: boolean
}

export default class Modal extends React.Component<CustomModalCoreProps, State> {

    public state: State = {isVisible: false};

    public render() {
        const {props, state} = this;
        const {isVisible} = state;
        const {children, nonButtonTrigger, buttonTrigger} = props;

        let modalView = null;

        if (isVisible) {
            modalView = (
                <Portal>
                    <ModalContainer
                        onClose={this._closeModal}
                        {...props}
                    >
                        {
                            () => children({closeModal: this._closeModal})
                        }
                    </ModalContainer>
                </Portal>
            );
        }

        return (
            <React.Fragment>
                {
                    buttonTrigger ?
                        React.cloneElement(buttonTrigger, {onPress: this._onOpen}) :
                        <TouchableOpacity onPress={this._onOpen}>
                            {nonButtonTrigger}
                        </TouchableOpacity>
                }
                {
                    modalView
                }
            </React.Fragment>
        )
    }

    private _onOpen = () => {
        this.setState({isVisible: true})
    };

    private _closeModal = () => {
        this.setState({isVisible: false})
    }

}

interface ModalContainerProps extends ModalProps {
    overlayProps?: OverlayProps;
    children?: () => ReactNode;
    onClose: () => void;
}

class ModalContainer extends React.Component<ModalContainerProps> {
    private keyboardDidHideListener;
    private keyboardDidShowListener;
    private keyboardIsShown: boolean;
    private timeoutId: any;
    private animationRef: RefObject<any> = createRef();

    public render() {
        const {children, containerStyle, overlayProps} = this.props;
        return (
            <Overlay
                enabled
                onPress={this._close}
                {...overlayProps}
            >
                <View
                    style={{
                        flex: 1, flexDirection: "column", justifyContent: "center",
                    }}
                >
                    <TouchableWithoutFeedback
                        onPress={(e) => {
                            /**
                             * Use this component to stop propagation from Overlay's onPress function,
                             *  so when the user taps on the modal content, it won't get closed.
                             */
                            e.stopPropagation();
                        }}
                    >
                        <Animatable.View
                            ref={this.animationRef}
                            animation="fadeInUp"
                        >
                            <View
                                style={
                                    [
                                        {
                                            alignSelf: "center",
                                            maxHeight: ScreenUtil.fullHeight() * 0.5,
                                            maxWidth: ScreenUtil.fullWidth() * 0.8,
                                            backgroundColor: Styles.modalBackgroundColor,
                                            borderRadius: 5,
                                        },
                                        containerStyle,
                                    ]
                                }
                            >
                                {
                                    children()
                                }
                            </View>
                        </Animatable.View>
                    </TouchableWithoutFeedback>
                </View>
            </Overlay>
        )
    }

    public componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

        BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);

    }

    public componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        clearTimeout(this.timeoutId);
        BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress);
    }

    private _handleBackPress = () => {
        this._close();
        return true;
    };

    private _close = async () => {
        // Don't close the modal when the keyboard is just closed.
        if (!this.keyboardIsShown) {
            await this.animationRef.current.fadeOutDown(500);
            this.props.onClose();
        }
    };


    private _keyboardDidShow = () => {
        this.keyboardIsShown = true;
    };

    private _keyboardDidHide = () => {
        this.timeoutId = setTimeout(() => this.keyboardIsShown = false, 150)
    };

}