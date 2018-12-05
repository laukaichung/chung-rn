import * as React from 'react'
import Button from "../../button";
import ConfirmModal from "../../confirm-modal";
import {NavigationProps} from "../demotype";
import ThemeContainer from "../../theme-provider/ThemeContainer";


export class ModalScreen extends React.Component<NavigationProps> {
    render() {
        return (
            <ThemeContainer>
                <ConfirmModal buttonTrigger={<Button>Confirm Button</Button>}
                              hint={"fsdj fksdsdfs dfdsffdsfsds fdsfd ds fdfs sf d"}
                              onConfirmClick={()=>alert('Confirmed')}>
                </ConfirmModal>
            </ThemeContainer>
        )
    }
}
