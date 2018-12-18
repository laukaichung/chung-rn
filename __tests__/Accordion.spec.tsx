import * as React from 'react'
import * as renderer from 'react-test-renderer';
import {ReactTestRenderer} from 'react-test-renderer';
import Grid from "../components/grid";
import Flex from "../components/flex/Flex";
import {Text} from 'react-native';
import Accordion, {AccordionPane} from "../components/accordion";
import CustomTouchableHighlight from "../components/custom-touchable-highlight";

interface PaneProps {
    text:string
}
const AccordionPane = ({text}:PaneProps)=>(
    <Text>{text}</Text>
)

const panes:AccordionPane[] = [
    {
        title:"A Title",
        render:()=> <AccordionPane text={"A Pane"}/>
    },
    {
        title:"B Title",
        render:()=> <AccordionPane text={"B Pane"}/>

    },
    {
        title:"C Title",
        render:()=> <AccordionPane text={"C Pane"}/>
    }
];

const defaultIndices = [0,2];

describe(`Accordion`, () => {
    let testRenderer:ReactTestRenderer;
    beforeAll(async ()=>{
        testRenderer = renderer.create((
            <Accordion defaultIndices={defaultIndices} panes={panes}/>
        ));
    });

    it(`Should render the default panes`, () => {
        let accordion = testRenderer.root.findByType(Accordion);
        expect(accordion.findAllByType(AccordionPane).length).toBe(defaultIndices.length)
    });

    it(`Should render options`,()=>{
        let accordion = testRenderer.root.findByType(Accordion);
        accordion.findAllByType(CustomTouchableHighlight)[1].props.onPress(null);
        expect(accordion.findAllByType(AccordionPane).length).toBe(panes.length)
    })

});


function getGridOption({testRenderer,index = 0}:{testRenderer:ReactTestRenderer,index:number}){
    const testInstance = testRenderer.root;
    testInstance.findByType(Grid).findAllByType(Flex.Item)[index].props.onPress();
}
