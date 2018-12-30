import * as React from 'react'
import {NavigationProps} from "../demotype";
import Tabs from "../../tabs/Tabs";
import Container from "../../ui-provider/UIContainer";
import ChungView from "../../chung-view/ChungView";
import ChungText from "../../chung-text/ChungText";

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
