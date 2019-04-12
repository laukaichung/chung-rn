import * as React from 'react'
import Button from "../../Button";
import ConfirmModal from "../../ConfirmModal";
import {NavigationProps} from "../demotype";
import UIMainContainer from "../../UIMainContainer";
import WhiteSpace from "../../WhiteSpace";
import Modal from "../../Modal";
import ChungText from "../../ChungText";
import WingBlank from "../../WingBlank";
import HintText from "../../HintText";


export class ModalScreen extends React.Component<NavigationProps> {
    render() {
        return (
            <UIMainContainer>
                <ConfirmModal
                    buttonTrigger={<Button>Confirm Button</Button>}
                    onConfirmMessage={"This is a demonstration of the modal component without the dependency of react-native-modal "}
                    onConfirm={()=>alert('Confirmed')}
                />
                <WhiteSpace size="lg"/>
                <Button
                    onPress={()=> {
                        Modal.add({
                            children: ({closeModal}) => (
                                <WingBlank size="lg" style={{padding: 20}}>
                                    <ChungText>
                                        Custom Modal Text
                                    </ChungText>
                                    <Button onPress={closeModal}>
                                        Close it
                                    </Button>
                                </WingBlank>
                            )
                        })
                    }}
                >
                    Imperatively open a modal
                </Button>

                <WhiteSpace size="lg"/>
                <Button
                    onPress={()=> {
                        ConfirmModal.add({
                            onConfirmMessage: "What do you want to do with the modal?",
                            onConfirm: ()=> alert("Confirmed!")
                        })
                    }}
                >
                    Imperatively open a confirm modal
                </Button>

            </UIMainContainer>
        )
    }
}
