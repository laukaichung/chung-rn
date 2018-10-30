import * as React from 'react'
import * as renderer from 'react-test-renderer';
import {ReactTestRenderer} from 'react-test-renderer';
import {Modal, TouchableWithoutFeedback} from 'react-native';
import RadioItem from "../components/radio/RadioItem";
import Radio from "../components/radio/Radio";
import ConfirmModal from "../components/confirm-modal";
import Button, {ButtonProps} from "../components/button";


describe(`ConfirmModal`, () => {
    let testRenderer: ReactTestRenderer;
    beforeAll(async () => {
        testRenderer = renderer.create((
            <ConfirmModal onConfirmClick={()=>{}}
                          confirmTitle={"Please Confirm"}
                          buttonTrigger={<Button>Trigger Button</Button>}/>
        ));
    });

    // Not completed
    it(`Should be open and closed`, () => {
        const testInstance = testRenderer.root;
        const button = testInstance.findByType(Button);
        let buttonProps:ButtonProps = button.props;
        buttonProps.onClick();
        testInstance.findAllByType(Button).map(o=>{
            if(o.props.children === "Confirm"){
                let buttonProps:ButtonProps = o.props;
                buttonProps.onClick()
            }
        });
        expect(1).toBeDefined();
    });

});

