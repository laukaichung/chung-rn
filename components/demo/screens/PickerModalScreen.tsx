import * as React from 'react'
import {RNScreenProps} from "../demotype";
import PickerModal, {PickerItem} from "../../picker-modal";
import List from "../../list/List";

interface Props extends RNScreenProps {}

interface State {
    selectedOptions:PickerItem[]
}

export class PickerModalScreen extends React.Component<Props, State> {
    public state = {selectedOptions:[]} as State;

    public render() {
        return (
            <List>
                <PickerModal onChange={(selectedOptions)=>this.setState({selectedOptions})}
                             selectedOptions={this.state.selectedOptions}
                             data={[
                                 {value:"A",text:"A Text"},
                                 {value:"B",text:"B Text"}
                             ]}
                             multiple
                             label={"Select"}
                />
            </List>
        )
    }
}
