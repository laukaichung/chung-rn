import * as React from 'react'
import {ScreenProps} from "../../type";
import PickerModal from "../../picker-modal";
import List from "../../list/List";

interface Props extends ScreenProps {

}

interface State {
    modal: boolean
}

export class PickerModalScreen extends React.Component<Props, State> {
    public state: State = {} as State;

    public render() {
        return (
            <List>
                <PickerModal onChange={({text})=>alert(text)}
                             value={null}
                             data={{optionA:1,optionB:2}}
                             label={"Select Option"}
                             hint={"Hello Hint Text"}/>
            </List>
        )
    }
}
