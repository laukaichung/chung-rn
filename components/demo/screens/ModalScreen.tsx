import * as React from 'react'
import Button from "../../Button";
import ConfirmModal from "../../ConfirmModal";
import {NavigationProps} from "../demotype";
import UIMainContainer from "../../UIMainContainer";
import WhiteSpace from "../../WhiteSpace";
import Modal from "../../Modal";
import {View} from "react-native";
import ChungText from "../../ChungText";
import WingBlank from "../../WingBlank";


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
                            children: () => (
                                <WingBlank size="lg" style={{padding: 20}}>
                                    <ChungText>
                                        Custom Modal Text
                                    </ChungText>
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
