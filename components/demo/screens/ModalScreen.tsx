import * as React from 'react'
import Button from "../../Button";
import ConfirmModal from "../../ConfirmModal";
import {NavigationProps} from "../demotype";
import UIContainer from "../../UIContainer";


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
