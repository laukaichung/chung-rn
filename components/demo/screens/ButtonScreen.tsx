import * as React from 'react'
import {NavigationProps} from "../demotype";
import UIContainer from "../../UIContainer";
import Button from "../../Button";
import {View} from "react-native";

interface State {
    modal: boolean
}

export class ButtonScreen extends React.Component<NavigationProps, State> {

    public state: State = {} as State;

    render() {
        return (
            <UIContainer>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {/*<Icon name={"trash"}*/}
                    {/*      onConfirmProps={{*/}
                    {/*          onConfirm: () => alert('confirm'),*/}
                    {/*          onCancel: () => alert('cancel'),*/}
                    {/*          onConfirmMessage: 'Are you sure you want to do this?'*/}
                    {/*      }}*/}
                    {/*/>*/}

                    <Button onPress={null}>
                        Test Button
                    </Button>
                </View>
            </UIContainer>
        )
    }
}
