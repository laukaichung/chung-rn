import * as React from 'react'
import * as renderer from 'react-test-renderer';
import {ReactTestRenderer} from "react-test-renderer";
import {PickerModal} from "../components";
import Button, {ButtonProps} from "../components/Button";
import Modal from "../components/Modal";
import Styles from "../components/Styles";
import Grid from "../components/Grid";
import {Text} from 'react-native';
import FlexItem from "../components/FlexItem";
import PickerOption, {PickerOptionData} from "../components/PickerOption";

const data:PickerOptionData[] = [
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
        let buttonProps:ButtonProps = button.props;
        buttonProps.onPress();
        // expect(modal.findAllByType(PickerOption).length).toBe(2);
        getGridOption({testRenderer,index:0});
        buttonProps.onPress();
        expect(modal.findAllByType(PickerOption)[0].findByType(Text).props.style.color).toBe(Styles.selectedBackgroundColor);
    })

});


function getGridOption({testRenderer,index = 0}:{testRenderer:ReactTestRenderer,index:number}){
    const testInstance = testRenderer.root;
    testInstance.findByType(Grid).findAllByType(FlexItem)[index].props.onPress();
}
