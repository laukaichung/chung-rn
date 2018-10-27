import * as React from 'react'
import {ScreenProps} from "../../type";
import {View,Text} from 'react-native'
import Button from "../../button";
import {Modal} from "../../index";

interface ModalScreenProps extends ScreenProps {

}

interface State {
    modal:boolean
}

export class ModalScreen extends React.Component<ModalScreenProps,State> {
    public state:State = {} as State;
    render() {
        return (
            <View>
                <Modal transparent
                       onClose={()=>this.setState({modal:false})}
                       maskClosable
                       visible={this.state.modal}>
                    <Text>Hello</Text>
                </Modal>
                <Button size="small"
                        onClick={()=>this.setState({modal:true})}
                        type="ghost">Hello</Button>
            </View>
        )
    }
}
