import * as React from 'react'
import {View} from 'react-native'
import Button from "../../button";
import CustomModal from "../../modal";
import {NavigationProps} from "../demotype";
import ThemeContainer from "../../theme-provider/ThemeContainer";
import ChungText from "../../chung-text";

interface State {
    modal: boolean
}

export class ButtonScreen extends React.Component<NavigationProps, State> {
    public state: State = {} as State;

    render() {
        return (
            <ThemeContainer>
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
            </ThemeContainer>
        )
    }
}
