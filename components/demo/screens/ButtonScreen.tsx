import * as React from 'react'
import {ScreenProps} from "../../type";
import {View,Text} from 'react-native'
import Button from "../../button";
import CustomModal from "../../modal";

interface ButtonScreenProps extends ScreenProps {

}

interface State {
    modal: boolean
}

export class ButtonScreen extends React.Component<ButtonScreenProps, State> {
    public state: State = {} as State;

    render() {
        return (
            <View>
                <CustomModal title={"Title"} buttonTrigger={<Button size="small" type="ghost">Hello</Button>}>
                    {
                        () => {
                            return (
                                <View>
                                    <Text>Hello</Text>
                                </View>
                            )
                        }
                    }
                </CustomModal>
            </View>
        )
    }
}
