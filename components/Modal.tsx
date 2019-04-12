import * as React from 'react';
import {createRef, ReactNode, RefObject} from 'react';
import {BackHandler, Keyboard, StyleProp, TouchableOpacity, TouchableWithoutFeedback, ViewStyle} from 'react-native'
import Styles from "./Styles";
import Overlay, {OverlayProps} from "./Overlay";
import Portal from "./portal/Portal";
import * as Animatable from "react-native-animatable";
import ScreenUtil from "./util/ScreenUtil";
import {Omit} from "./type";
import DeviceInfo from "react-native-device-info";

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

    private containerRef: RefObject<ModalContainer> = createRef();
    public state: State = {isVisible: false};

    public static add = modalAdd;

    public render() {
        const {props, state} = this;
        const {isVisible} = state;
        const {children, nonButtonTrigger, buttonTrigger} = props;

        let modalView = null;

        if (isVisible) {
            modalView = (
                <Portal>
                    <ModalContainer
                        ref={this.containerRef}
                        onClose={this._onClose}
                        {...props}
                    >
                        {
                            () => children({closeModal: this._closeModalByChildren})
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

    private _onClose = ()=>{
        this.setState({isVisible: false})
    };

    private _closeModalByChildren = () => {
        const {current} = this.containerRef;
        if(current) {
            current.fadeOut();
        }
        this._onClose();
    }
}

interface ModalContainerProps extends ModalProps {
    overlayProps?: OverlayProps;
    children?: (data:Partial<ModalCallback>) => ReactNode;
    onClose: () => void;
}

export class ModalContainer extends React.Component<ModalContainerProps> {
    private keyboardDidHideListener;
    private keyboardDidShowListener;
    private keyboardIsShown: boolean;
    private timeoutId: any;
    public animationRef: RefObject<any> = createRef();

    public render() {
        const {children, containerStyle, overlayProps} = this.props;
        const fullWidth = ScreenUtil.fullWidth();
        return (
            <Overlay
                enabled
                onPress={this._close}
                style={{flex: 1, justifyContent: "center", alignItems: "center"}}
                {...overlayProps}
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
                        style={
                            [
                                {
                                    width: DeviceInfo.isTablet() ? fullWidth * 0.6: fullWidth * 0.9,
                                    backgroundColor: Styles.modalBackgroundColor,
                                    borderRadius: 5,
                                },
                                containerStyle,
                            ]
                        }
                    >
                        {children({closeModal: this._close})}
                    </Animatable.View>
                </TouchableWithoutFeedback>
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
            await this.fadeOut();
            this.props.onClose();
        }
    };

    public fadeOut = async ()=>{
        await this.animationRef.current.fadeOutDown(500);
    };


    private _keyboardDidShow = () => {
        this.keyboardIsShown = true;
    };

    private _keyboardDidHide = () => {
        this.timeoutId = setTimeout(() => this.keyboardIsShown = false, 150)
    };

}


function modalAdd(props: Omit<ModalContainerProps, "onClose">) {

    const key = Portal.add((
        <ModalContainer
            {...props}
            onClose={() => {
                Portal.remove(key);
            }}
        />
    ))
}