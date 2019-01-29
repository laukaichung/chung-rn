import * as React from 'react'
import {NavigationProps} from "../demotype";
import PickerModal, {PickerItem} from "../../PickerModal";
import List from "../../List";
import UIContainer from "../../UIContainer";
import ChungText from "../../ChungText";
import {ScrollView} from "react-native";

interface State {
    selectedOptions: PickerItem[]
}


const options = [
    {value: "A", text: "Afsd  Text fdsfdsfds"},
    {value: "B", text: "B adsds sda Text"},
    {value: "A", text: "A Text"},
    {value: "B", text: "B Text"},
    {value: "A", text: "A Text"},
    {value: "B", text: "B Text"},
    {value: "A", text: "A Text"},
    {value: "Z", text: "Z Text"}
]

export class PickerModalScreen extends React.Component<NavigationProps, State> {

    public state = {selectedOptions: []} as State;

    public render() {
        const {selectedOptions} = this.state;
        return (
            <UIContainer>
                <ScrollView>
                    <List>
                        <PickerModal
                            onChange={(newSelectedOptions) =>
                                this.setState({selectedOptions: newSelectedOptions})}
                            gridProps={{
                                mobileNumColumns: 3,
                                tabletNumColumns: 4,
                            }}
                            selectedOptions={selectedOptions}
                            data={options}
                            multiple
                            hint={"This is hint text"}
                            label={"Normal"}
                        />
                        <PickerModal
                            onChange={(newSelectedOptions) =>
                                this.setState({selectedOptions: newSelectedOptions})}
                            gridProps={{
                                mobileNumColumns: 3,
                                tabletNumColumns: 4,
                            }}
                            renderPickerOption={(data) => {
                                return (
                                    <ChungText>!{data.option.text}!</ChungText>
                                )
                            }}
                            selectedOptions={selectedOptions}
                            data={options}
                            multiple
                            hint={"This is hint text"}
                            label={"Custom option component"}
                        />
                    </List>
                </ScrollView>
            </UIContainer>
        )
    }
}
