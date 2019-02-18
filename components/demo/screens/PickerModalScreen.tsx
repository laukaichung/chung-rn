import * as React from 'react'
import {NavigationProps} from "../demotype";
import PickerModal from "../../PickerModal";
import List from "../../List";
import UIContainer from "../../UIContainer";
import ChungText from "../../ChungText";
import {ScrollView} from "react-native";
import {PickerOptionData} from "../../PickerOption";

interface State {
    selectedOptions: PickerOptionData[]
}


const options = [
    {value: "A", text: "Afsd  Text fdsfdsfds"},
    {value: "B", text: "B adsds sda Text"},
    {value: "A", text: "A df gdfgdg dfg"},
    {value: "B", text: "B  dd df dfgfd "},
    {value: "A", text: "5sdffsd sdf "},
    {value: "B", text: "6fxv dsf"},
    {value: "a", text: "sd sd zx "},
    {value: "3", text: "4tdsfdsf "},
    {value: "5", text: "A Text"},
    {value: "fgdd", text: "dgfre Text"},
    {value: "Afdg", text: "dfgfd Text"},
    {value: "gdfg", text: "Z dfgdf"},
    {value: "A", text: "Afsd  Text fdsfdsfds"},
    {value: "B", text: "B adsds sda Text"},
    {value: "A", text: "A df gdfgdg dfg"},
    {value: "B", text: "B  dd df dfgfd "},
    {value: "A", text: "5sdffsd sdf "},
    {value: "B", text: "6fxv dsf"},
    {value: "a", text: "sd sd zx "},
    {value: "3", text: "4tdsfdsf "},
    {value: "5", text: "A Text"},
    {value: "fgdd", text: "dgfre Text"},
    {value: "Afdg", text: "dfgfd Text"},
    {value: "gdfg", text: "Z dfgdf"}
];

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
                            selectedOptions={selectedOptions}
                            data={options}
                            multiple
                            hint={"This is hint text"}
                            label={"Normal"}

                        />
                        <PickerModal
                            onChange={(newSelectedOptions) =>
                                this.setState({selectedOptions: newSelectedOptions})}
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
