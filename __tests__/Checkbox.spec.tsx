import * as React from 'react'
import * as renderer from 'react-test-renderer';
import {ReactTestRenderer} from 'react-test-renderer';
import {TouchableWithoutFeedback} from 'react-native';
import CheckboxListItem from "../components/CheckboxListItem";
import Checkbox from "../components/CheckBox";


describe(`Checkbox`, () => {
    let testRenderer: ReactTestRenderer;
    beforeAll(async () => {
        testRenderer = renderer.create((
            <CheckboxListItem
                checked={true}
                label={"Check this"}
                onChange={()=>{}}/>
        ));
    });

    it(`Should be checked`, () => {

        click(testRenderer);
        expect(testRenderer.root.findByType(Checkbox).instance.state.checked).toBeFalsy();
        click(testRenderer);
        expect(testRenderer.root.findByType(Checkbox).instance.state.checked).toBeTruthy();

    });

});


function click(testRenderer: ReactTestRenderer){
    testRenderer.root.findByType(TouchableWithoutFeedback).props.onPress();

}
