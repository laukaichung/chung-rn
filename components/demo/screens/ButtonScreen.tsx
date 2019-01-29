import * as React from 'react'
import {NavigationProps} from "../demotype";
import UIContainer from "../../UIContainer";
import Icon from "../../Icon";
import WingBlank from "../../WingBlank";

interface State {
    modal: boolean
}

export class ButtonScreen extends React.Component<NavigationProps, State> {

    public state: State = {} as State;

    render() {
        return (
            <UIContainer>
                <WingBlank>
                    <Icon name={"trash"}
                          onConfirmProps={{
                              onConfirm: () => alert('confirm'),
                              onCancel: () => alert('cancel'),
                              onConfirmMessage: 'Are you sure you want to do this?'
                          }}
                    />
                </WingBlank>
            </UIContainer>
        )
    }
}
