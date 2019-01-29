import * as React from 'react'
import Button, {ButtonProps} from "./Button";
import ConfirmModal from "./ConfirmModal";

interface ConfirmButtonProps extends ButtonProps {
    confirmMessage?: string
    title?: string
}

const ConfirmButton = (props: ConfirmButtonProps) => {
    const {confirmMessage, onPress, title} = props;
    return (
        <ConfirmModal
            onConfirm={onPress}
            buttonTrigger={(
                <Button{...props}/>
            )}
            onConfirmMessage={confirmMessage}
            title={title}
        />
    )
};

export default ConfirmButton
