import * as React from 'react'
import {View} from 'react-native'
import Button from "../../Button";
import CustomModal from "../../Modal";
import {NavigationProps} from "../demotype";
import UIContainer from "../../UIContainer";
import ChungText from "../../ChungText";

interface State {
    modal: boolean
}

export class ButtonScreen extends React.Component<NavigationProps, State> {

    public state: State = {} as State;

    render() {
        return (
            <UIContainer>
                <CustomModal title={"Title"} buttonTrigger={<Button size="sm" type="ghost">Hello</Button>}>
                    {
                        () => {
                            return (
                                <View>
                                    <ChungText>Hello</ChungText>
                                </View>
                            )
                        }
                    }
                </CustomModal>
            </UIContainer>
        )
    }
}
