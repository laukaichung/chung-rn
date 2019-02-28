import * as React from "react"
import ToastContainer, {ToastProps} from "./ToastContainer";
import Portal from "./portal/Portal";
import Modal, {ModalCallback} from "./Modal";
import {View} from "react-native";
import {ReactNode} from "react";
import * as Animatable from 'react-native-animatable';
import Overlay from "./Overlay";

interface ImperativeModalProps {
    children: (callback: ModalCallback) => ReactNode;
    shouldCloseOnOverlayClick?: boolean;
}

export function imperativeModal({children, shouldCloseOnOverlayClick = true}: ImperativeModalProps) {
    const key = Portal.add(
        <Overlay
            onPress={shouldCloseOnOverlayClick ? () => Portal.remove(key) : null}
            enabled
        >
            <View
                style={{flex: 1, flexDirection: "column", justifyContent: "center"}}
            >
                <Animatable.View animation="fadeInUp">
                    {
                        children(
                            {
                                closeModal: () => Portal.remove(key)
                            }
                        )
                    }
                </Animatable.View>
            </View>
        </Overlay>
        ,
    );
    return key;
}


// class AnimatedContainer extends React.Component<AnimatedContainerProps>{
//     render(){
//         return (
//             <Animatable.View animation="fadeInUp">
//                 {this.props.children}
//             </Animatable.View>
//
//         )
//     }
// }