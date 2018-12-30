import * as React from 'react'
import {NavigationProps} from "../demotype";
import Tabs from "../../Tabs";
import Container from "../../UIContainer";
import ChungView from "../../ChungView";
import ChungText from "../../ChungText";

export class TabScreen extends React.Component<NavigationProps> {
    render() {
        return (
            <Container>
                <Tabs tabs={[{ title: "First"},{title: "Second"}]}>
                    <ChungView>
                        <ChungText>First</ChungText>
                    </ChungView>
                    <ChungView>
                        <ChungText>Second</ChungText>
                    </ChungView>
                </Tabs>
            </Container>
        )
    }
}
