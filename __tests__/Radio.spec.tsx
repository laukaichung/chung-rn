import * as React from 'react'
import * as renderer from 'react-test-renderer';
import {ReactTestRenderer} from 'react-test-renderer';
import {TouchableWithoutFeedback} from 'react-native';
import RadioItem from "../components/radio/RadioItem";
import Radio from "../components/radio/Radio";


describe(`Radio`, () => {
    let testRenderer: ReactTestRenderer;
    beforeAll(async () => {
        testRenderer = renderer.create((
            <RadioItem
                checked={true}
                label={"Check this"}
                onChange={()=>{}}/>
        ));
    });

    it(`Should be checked`, () => {
        click(testRenderer);
        expect(testRenderer.root.findByType(Radio).instance.state.checked).toBeFalsy();
        click(testRenderer);
        expect(testRenderer.root.findByType(Radio).instance.state.checked).toBeTruthy();

    });

});


function click(testRenderer: ReactTestRenderer){
    testRenderer.root.findByType(TouchableWithoutFeedback).props.onPress();

}
