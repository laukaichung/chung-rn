import * as React from 'react'
import {NavigationProps} from "../demotype";
import List from "../../list/List";
import TextAreaItem from "../../textarea-item";
import InputItem from "../../input-item";
import UIContainer from "../../ui-provider/UIContainer";
import ChungText from "../../chung-text";


export class TextAreaScreen extends React.Component<NavigationProps> {
    public render() {
        return (
            <UIContainer>
                <List>
                    <List.Item>
                        <ChungText>Hello</ChungText>
                    </List.Item>
                    <TextAreaItem last
                                  placeholder={`Enter here`}
                                  rows={5}
                                  count={40}
                                  onChange={(val)=>console.log(val)}/>
                    <InputItem label={"Input"} placeholder={"Enter here"}/>
                </List>
            </UIContainer>
        )
    }
}
