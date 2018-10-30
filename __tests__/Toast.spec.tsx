import * as React from 'react'
import * as renderer from 'react-test-renderer';
import {ReactTestRenderer} from 'react-test-renderer';
import {ActivityIndicator,Image} from 'react-native';
import ToastContainer from "../components/toast/ToastContainer";


describe(`Loading Toast`, () => {
    let testRenderer: ReactTestRenderer;
    beforeAll(async () => {
        testRenderer = renderer.create((
            <ToastContainer content={"loading"} type="loading"/>
        ));
    });


    it(`Should contain ActivityIndicator`, () => {
        expect(testRenderer.root.findByType(ActivityIndicator)).toBeDefined()
    });

});

describe(`Success Toast`, () => {
    let testRenderer: ReactTestRenderer;
    beforeAll(async () => {
        testRenderer = renderer.create((
            <ToastContainer content={"loading"} type="success"/>
        ));
    });


    it(`Should contain Image for success toast`, () => {
        expect(testRenderer.root.findByType(Image)).toBeDefined()
    });

});
