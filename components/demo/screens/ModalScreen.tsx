import * as React from 'react'
import {RNScreenProps} from "../demotype";
import {View} from 'react-native'
import Button from "../../button";
import {ConfirmModal} from "../../modal/ConfirmModal";

interface ModalScreenProps extends RNScreenProps {

}



export class ModalScreen extends React.Component<ModalScreenProps> {
    render() {
        return (
            <View>
                <ConfirmModal buttonTrigger={<Button>Confirm Button</Button>}
                              hint={"fsdj fksdsdfs dfdsffdsfsds fdsfd ds fdfs sf d"}
                              onConfirmClick={()=>alert('Confirmed')}>
                </ConfirmModal>
            </View>
        )
    }
}
