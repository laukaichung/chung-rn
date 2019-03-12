import * as React from 'react'
import ConfirmModal from "./ConfirmModal";
import {ReactNode} from "react";
import {StyleProp, ViewStyle} from "react-native";

interface ConfirmButtonProps {
    confirmMessage?: string
    title?: string
    button?: ReactNode
    onConfirm?: ()=> void;
    containerStyle?: StyleProp<ViewStyle>
}

const ConfirmButton = (props: ConfirmButtonProps) => {
    const {confirmMessage, onConfirm, button, title, containerStyle} = props;
    return (
        <ConfirmModal
            containerStyle={[{minHeight: 100}, containerStyle]}
            onConfirm={onConfirm}
            buttonTrigger={button}
            onConfirmMessage={confirmMessage}
            title={title}
        />
    )
};

export default ConfirmButton
