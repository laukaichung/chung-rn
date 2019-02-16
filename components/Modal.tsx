import * as React from 'react';
import {ReactNode} from 'react';
import RNModal from "react-native-modal";
import {Keyboard, View} from 'react-native'
import Styles from "./Styles";
import {CustomTouchableHighlight} from "./CustomTouchableHighlight";
import Header from "./Header";

export interface ModalCallback {
    closeModal: () => void;
}

export interface ModalProps {
    title?: string
    nonButtonTrigger?: ReactNode;
    buttonTrigger?: any;
    fullScreen?: boolean;
    paddingHorizontal?: boolean;
    scrollable?: boolean
    scrollableFixedHeight?: number
}

interface CustomModalCoreProps extends ModalProps {
    children: (callback: ModalCallback) => ReactNode;

}

interface State {
    isVisible: boolean
}

export default class Modal extends React.Component<CustomModalCoreProps, State> {
    private keyboardDidHideListener;
    private keyboardDidShowListener;
    private keyboardIsShown: boolean;
    private timeoutId: any;

    public constructor(props) {
        super(props);
        this.state = {isVisible: false}
    }

    public render() {
        const {props, state} = this;
        const {isVisible} = state;
        const {children, title, nonButtonTrigger, scrollable, scrollableFixedHeight, paddingHorizontal = true, fullScreen, buttonTrigger} = props;
        return (
            <React.Fragment>
                {
                    buttonTrigger ?
                        React.cloneElement(buttonTrigger, {onPress: this._onOpen}) :
                        <CustomTouchableHighlight onPress={this._onOpen}>
                            {nonButtonTrigger}
                        </CustomTouchableHighlight>
                }
                {
                    isVisible &&
                    <RNModal
                        onBackButtonPress={this._closeModal}
                        style={fullScreen && {margin: 0}}
                        supportedOrientations={['portrait', 'landscape']}
                        isVisible={isVisible}
                        onBackdropPress={this._closeModal}
                    >
                        {
                            isVisible &&
                            <View style={
                                [
                                    paddingHorizontal && {paddingHorizontal: Styles.padding},
                                    {
                                        backgroundColor: Styles.modalBackgroundColor,
                                        paddingVertical: Styles.padding

                                    },
                                    scrollable ? {height: scrollableFixedHeight || 400} : {minHeight: 100}

                                ]}>
                                {title && <Header center marginVertical>{title}</Header>}
                                {children({closeModal: this._closeModal})}
                            </View>

                        }
                    </RNModal>
                }
            </React.Fragment>
        )
    }

    public componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    public componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        clearTimeout(this.timeoutId);
    }

    private _closeModal = () => {
        // Don't close the modal when the keyboard is just closed.
        if (!this.keyboardIsShown) this.setState({isVisible: false})
    };

    private _onOpen = (e) => {
        this.setState({isVisible: true})
    };

    private _keyboardDidShow = () => {
        this.keyboardIsShown = true;
    };

    private _keyboardDidHide = () => {
        this.timeoutId = setTimeout(() => this.keyboardIsShown = false, 150)
    };

}
//
// const styles = StyleSheet.create({
//     container: {
//         minHeight: 100,
//         paddingVertical: Styles.padding
//     },
// });
