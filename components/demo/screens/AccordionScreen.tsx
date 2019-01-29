import * as React from 'react'
import Accordion from "../../Accordion";
import {NavigationProps} from "../demotype";
import Container from "../../UIContainer";
import ChungText from "../../ChungText";

export class AccordionScreen extends React.Component<NavigationProps> {

    render() {
        return (
            <Container>
                <Accordion
                    panes={[
                        {
                            title: 'Title A ddsd',
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
                                    <ChungText>Title C</ChungText>
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
