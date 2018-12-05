import * as React from 'react'
import {NavigationProps} from "../demotype";
import List from "../../list/List";
import TextAreaItem from "../../textarea-item";
import InputItem from "../../input-item";
import ThemeContainer from "../../theme-provider/ThemeContainer";
import ChungText from "../../chung-text";


export class TextAreaScreen extends React.Component<NavigationProps> {
    public render() {
        return (
            <ThemeContainer>
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
            </ThemeContainer>
        )
    }
}
