import * as React from 'react'
import {NavigationProps} from "../demotype";
import Tabs from "../../tabs";
import Container from "../../theme-provider/ThemeContainer";
import ChungView from "../../chung-view";
import ChungText from "../../chung-text";

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