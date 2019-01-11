import * as React from 'react'
import {NavigationProps} from "../demotype";
import PickerModal, {PickerItem} from "../../PickerModal";
import List from "../../List";
import UIContainer from "../../UIContainer";
import ChungText from "../../ChungText";

interface State {
    selectedOptions: PickerItem[]
}

export class PickerModalScreen extends React.Component<NavigationProps, State> {

    public state = {selectedOptions: []} as State;

    public render() {
        return (
            <UIContainer>
                <List>
                    <PickerModal
                        onChange={(selectedOptions) => this.setState({selectedOptions})}
                        gridProps={{
                            mobileNumColumns:5,
                            tabletNumColumns:4,
                        }}
                        renderPickerOption={(data)=>{
                            return (
                                <ChungText>!{data.option.text}!</ChungText>
                            )
                        }}
                        selectedOptions={this.state.selectedOptions}
                        data={[
                            {value: "A", text: "A Text"},
                            {value: "B", text: "B Text"},
                            {value: "A", text: "A Text"},
                            {value: "B", text: "B Text"},
                            {value: "A", text: "A Text"},
                            {value: "B", text: "B Text"},
                            {value: "A", text: "A Text"},
                            {value: "Z", text: "Z Text"}
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
