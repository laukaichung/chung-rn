import * as React from 'react'
import * as renderer from 'react-test-renderer';
import {ReactTestRenderer} from 'react-test-renderer';
import {ActivityIndicator} from "../components";
import {Text} from 'react-native';


describe(`ActivityIndicator`, () => {
    let testRenderer:ReactTestRenderer;
    beforeAll(async ()=>{
        testRenderer = renderer.create((
                <ActivityIndicator text={"Loading"}/>
        ));
    });

    it(`Should contain Text component`, () => {
        expect(testRenderer.root.findByType(Text)).toBeDefined()
    });

});
