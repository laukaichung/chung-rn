import * as React from 'react'
import {NavigationProps} from "../demotype";
import PickerModal, {PickerItem} from "../../picker-modal";
import List from "../../list/List";
import ThemeContainer from "../../theme-provider/ThemeContainer";

interface State {
    selectedOptions: PickerItem[]
}

export class PickerModalScreen extends React.Component<NavigationProps, State> {
    public state = {selectedOptions: []} as State;

    public render() {
        return (
            <ThemeContainer>
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
            </ThemeContainer>
        )
    }
}
