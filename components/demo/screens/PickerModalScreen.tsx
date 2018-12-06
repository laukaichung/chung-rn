import * as React from 'react'
import {NavigationProps} from "../demotype";
import PickerModal, {PickerItem} from "../../picker-modal";
import List from "../../list/List";
import UIContainer from "../../ui-provider/UIContainer";

interface State {
    selectedOptions: PickerItem[]
}

export class PickerModalScreen extends React.Component<NavigationProps, State> {
    public state = {selectedOptions: []} as State;

    public render() {
        return (
            <UIContainer>
                <List>
                    <PickerModal onChange={(selectedOptions) => this.setState({selectedOptions})}
                                 selectedOptions={this.state.selectedOptions}
                                 data={[
                                     {value: "A", text: "A Text"},
                                     {value: "B", text: "B Text"}
                                 ]}
                                 multiple
                                 hint={"This is hint text"}
                                 label={"Select"}
                    />
                </List>
            </UIContainer>
        )
    }
}
