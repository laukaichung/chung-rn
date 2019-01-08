import * as React from 'react'
import {NavigationProps} from "../demotype";
import UIContainer from "../../UIContainer";
import Result from "../../Result";
import ChungText from "../../ChungText";

export default class ResultScreen extends React.Component<NavigationProps> {
    render() {
        return (
            <UIContainer>
                <Result
                    title={"Warning"}
                    iconProps={{
                        name:"trash"
                    }}
                    type="warning"
                >
                    <ChungText>
                        This is a message
                    </ChungText>
                </Result>
            </UIContainer>
        )
    }
}
