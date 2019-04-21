import * as React from 'react'
import {NavigationProps} from "../demotype";
import List from "../../List";
import TextAreaListItem from "../../TextAreaListItem";
import InputListItem from "../../InputListItem";
import UIMainContainer from "../../UIMainContainer";
import ChungText from "../../ChungText";
import {ListItem} from "../../index";


export class TextAreaScreen extends React.Component<NavigationProps> {
    public render() {
        return (
            <UIMainContainer>
                <List>
                    <ListItem>
                        <ChungText>Hello</ChungText>
                    </ListItem>
                    <TextAreaListItem
                        last
                        label={"Label"}
                        placeholder={`Enter here`}
                        rows={5}
                        count={40}
                        onChange={(val) => console.log(val)}
                    />
                    <InputListItem label={"Input"} placeholder={"Enter here"}/>
                </List>
            </UIMainContainer>
        )
    }
}
