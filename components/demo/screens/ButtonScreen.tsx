import * as React from 'react'
import {View} from 'react-native'
import Button from "../../button/Button";
import CustomModal from "../../modal/Modal";
import {NavigationProps} from "../demotype";
import UIContainer from "../../ui-provider/UIContainer";
import ChungText from "../../chung-text/ChungText";

interface State {
    modal: boolean
}

export class ButtonScreen extends React.Component<NavigationProps, State> {

    public state: State = {} as State;

    render() {
        return (
            <UIContainer>
                <CustomModal title={"Title"} buttonTrigger={<Button size="small" type="ghost">Hello</Button>}>
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
