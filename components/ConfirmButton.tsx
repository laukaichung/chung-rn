import * as React from 'react'
import Button, {ButtonProps} from "./Button";
import ConfirmModal from "./ConfirmModal";

interface ConfirmButtonProps extends ButtonProps {
    confirmMessage?: string
    title?: string
    buttonProps: ButtonProps;
}

const ConfirmButton = (props: ConfirmButtonProps) => {
    const {confirmMessage, buttonProps, onPress, title} = props;
    return (
        <ConfirmModal
            containerStyle={{minHeight: 150}}
            onConfirm={onPress}
            buttonTrigger={(
                <Button {...buttonProps}/>
            )}
            onConfirmMessage={confirmMessage}
            title={title}
        />
    )
};

export default ConfirmButton
