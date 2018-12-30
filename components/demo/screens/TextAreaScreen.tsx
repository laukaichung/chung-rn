import * as React from 'react'
import {NavigationProps} from "../demotype";
import List from "../../list/List";
import TextAreaListItem from "../../textarea-list-item/TextAreaListItem";
import InputListItem from "../../input-list-item/InputListItem";
import UIContainer from "../../ui-provider/UIContainer";
import ChungText from "../../chung-text/ChungText";


export class TextAreaScreen extends React.Component<NavigationProps> {
    public render() {
        return (
            <UIContainer>
                <List>
                    <List.Item>
                        <ChungText>Hello</ChungText>
                    </List.Item>
                    <TextAreaListItem last
                                      placeholder={`Enter here`}
                                      rows={5}
                                      count={40}
                                      onChange={(val)=>console.log(val)}/>
                    <InputListItem label={"Input"} placeholder={"Enter here"}/>
                </List>
            </UIContainer>
        )
    }
}
