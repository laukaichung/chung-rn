import * as React from 'react'
import {Text, View} from 'react-native'
import {ScreenProps} from "../../type";
import {Accordion} from "../../accordion/Accordion";
interface AccordionScreenProps extends ScreenProps{

}

export class AccordionScreen extends React.Component<AccordionScreenProps>{

    render() {
        return (
            <View>
                <Accordion
                    panes={[
                        {
                            title:'Title A',
                            render: ()=>{
                                return (
                                    <Text>Pane A Content</Text>
                                )
                            }
                        },
                        {
                            title:'Title B',
                            render: ()=>{
                                return (
                                    <Text>Pane B Content</Text>
                                )
                            }
                        },
                        {
                            title:'Title C',
                            render: ()=>{
                                return (
                                    <Text>Pane C Content</Text>
                                )
                            }
                        }
                    ]}
                    defaultIndices={[0]}/>
            </View>
        )
    }
}
