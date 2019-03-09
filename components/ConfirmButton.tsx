import * as React from 'react'
import Button, {ButtonProps} from "./Button";
import ConfirmModal from "./ConfirmModal";
import {ReactNode} from "react";

interface ConfirmButtonProps extends ButtonProps {
    confirmMessage?: string
    title?: string
    button?: ReactNode
}

const ConfirmButton = (props: ConfirmButtonProps) => {
    const {confirmMessage, onPress, button, title} = props;
    return (
        <ConfirmModal
            containerStyle={{minHeight: 150}}
            onConfirm={onPress}
            buttonTrigger={button}
            onConfirmMessage={confirmMessage}
            title={title}
        />
    )
};

export default ConfirmButton
