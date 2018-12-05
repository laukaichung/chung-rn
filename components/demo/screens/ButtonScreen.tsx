import * as React from 'react'
import {View,Text} from 'react-native'
import Button from "../../button";
import CustomModal from "../../modal";
import {NavigationProps} from "../demotype";

interface State {
    modal: boolean
}

export class ButtonScreen extends React.Component<NavigationProps, State> {
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
