import * as React from 'react'
import Button from "../../Button";
import ConfirmModal from "../../ConfirmModal";
import {NavigationProps} from "../demotype";
import UIMainContainer from "../../UIMainContainer";


export class ModalScreen extends React.Component<NavigationProps> {
    render() {
        return (
            <UIMainContainer>
                <ConfirmModal
                    buttonTrigger={<Button>Confirm Button</Button>}
                    onConfirmMessage={"This is a demonstration of the modal component without the dependency of react-native-modal "}
                    onConfirm={()=>alert('Confirmed')}
                />
            </UIMainContainer>
        )
    }
}
