import * as React from 'react'
import Accordion from "../../Accordion";
import {NavigationProps} from "../demotype";
import Container from "../../UIContainer";
import ChungText from "../../ChungText";
import Divider from "../../Divider";

export class AccordionScreen extends React.Component<NavigationProps> {

    render() {
        return (
            <Container>
                <Divider/>
                <Accordion
                    panes={[
                        {
                            title: 'Title A',
                            render: () => {
                                return (
                                    <ChungText>Title A</ChungText>

                                )
                            }
                        },
                        {
                            title: 'Title B',
                            render: () => {
                                return (
                                    <ChungText>Title B</ChungText>
                                )
                            }
                        },
                        {
                            title: 'Title C',
                            render: () => {
                                return (
                                    <ChungText>Affronting discretion as do is announcing. Now months esteem oppose nearer enable too six. She numerous unlocked you perceive speedily. Affixed offence spirits or ye of offices between. Real on shot it were four an as. Absolute bachelor rendered six nay you juvenile. Vanity entire an chatty to. </ChungText>
                                )
                            }
                        }
                    ]}
                    defaultIndices={[0]}
                />
            </Container>
        )
    }
}
