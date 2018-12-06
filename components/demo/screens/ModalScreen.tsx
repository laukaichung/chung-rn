import * as React from 'react'
import Button from "../../button";
import ConfirmModal from "../../confirm-modal";
import {NavigationProps} from "../demotype";
import UIContainer from "../../ui-provider/UIContainer";


export class ModalScreen extends React.Component<NavigationProps> {
    render() {
        return (
            <UIContainer>
                <ConfirmModal buttonTrigger={<Button>Confirm Button</Button>}
                              hint={"fsdj fksdsdfs dfdsffdsfsds fdsfd ds fdfs sf d"}
                              onConfirmClick={()=>alert('Confirmed')}>
                </ConfirmModal>
            </UIContainer>
        )
    }
}
