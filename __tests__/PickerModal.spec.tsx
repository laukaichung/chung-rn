import * as React from 'react'
import * as renderer from 'react-test-renderer';
import {ReactTestRenderer} from "react-test-renderer";
import {PickerModal} from "../components";
import {PickerItem, PickerOption} from "../components/picker-modal";
import Button, {ButtonProps} from "../components/button";
import Modal from "../components/modal";
import Styles from "../components/style";
import Grid from "../components/grid";
import Flex from "../components/flex/Flex";
import {Text} from 'react-native';

const data:PickerItem[] = [
    {
        text:"A",
        value:"A"
    },
    {
        text:"B",
        value:"B"
    }
];

describe(`PickerModal`, () => {
    let testRenderer:ReactTestRenderer;
    beforeAll(async ()=>{
        testRenderer = renderer.create((
                <PickerModal onChange={()=>{}}
                             label={"Select Option"}
                             data={data}
                             buttonTrigger={<Button>Open</Button>}
                             selectedOptions={[]}>
                </PickerModal>
        ));
    });

    it(`Should have a button to trigger the modal`, () => {
        expect(testRenderer.root.findAllByType(Button).length).toBe(1)
    });

    it(`Should render options`,()=>{

        const testInstance = testRenderer.root;
        const modal = testInstance.findByType(Modal);
        const button = testInstance.findByType(Button);
        let buttonProps:ButtonProps = button.props
        buttonProps.onPress();
        // expect(modal.findAllByType(PickerOption).length).toBe(2);
        getGridOption({testRenderer,index:0});
        buttonProps.onPress();
        expect(modal.findAllByType(PickerOption)[0].findByType(Text).props.style.color).toBe(Styles.backgroundColorSelected);
    })

});


function getGridOption({testRenderer,index = 0}:{testRenderer:ReactTestRenderer,index:number}){
    const testInstance = testRenderer.root;
    testInstance.findByType(Grid).findAllByType(Flex.Item)[index].props.onPress();
}
