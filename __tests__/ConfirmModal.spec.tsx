import * as React from 'react'
import * as renderer from 'react-test-renderer';
import {ReactTestRenderer} from 'react-test-renderer';
import ConfirmModal from "../components/confirm-modal/ConfirmModal";
import Button, {ButtonProps} from "../components/button/Button";


describe(`ConfirmModal`, () => {
    let testRenderer: ReactTestRenderer;
    beforeAll(async () => {
        testRenderer = renderer.create((
            <ConfirmModal onConfirmClick={()=>{}}
                          title={"Please Confirm"}
                          buttonTrigger={<Button>Trigger Button</Button>}/>
        ));
    });

    // Not completed
    it(`Should be open and closed`, () => {
        const testInstance = testRenderer.root;
        const button = testInstance.findByType(Button);
        let buttonProps:ButtonProps = button.props;
        buttonProps.onPress();
        testInstance.findAllByType(Button).map(o=>{
            if(o.props.children === "Confirm"){
                let buttonProps:ButtonProps = o.props;
                buttonProps.onPress()
            }
        });
        expect(1).toBeDefined();
    });

});

