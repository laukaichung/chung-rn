import * as React from 'react';
import {ReactNode} from 'react';
import Modal, {ModalCallback} from "./Modal";
import ActionButton, {ActionButtonProps} from "./ActionButton";

interface ActionButtonModal extends ActionButtonProps{
    children: (payload: ModalCallback) => ReactNode

}

 const ActionButtonModal = ({children,...actionButtonProps}:ActionButtonModal)=> {
     return (
            <Modal buttonTrigger={<ActionButton {...actionButtonProps}/>}>
                {
                    (payload) => children(payload)
                }
            </Modal>
        )

};

export default ActionButtonModal;
