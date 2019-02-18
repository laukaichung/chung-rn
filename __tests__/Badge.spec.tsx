import * as React from 'react'
import * as renderer from 'react-test-renderer';
import {ReactTestRenderer} from 'react-test-renderer';
import {Text} from 'react-native';
import Badge from "../components/Badge";


describe(`Badge`, () => {
    let testRenderer:ReactTestRenderer;
    beforeAll(async ()=>{
        testRenderer = renderer.create((
                <Badge>
                    Loading
                </Badge>
        ));
    });

    it(`Should contain Text component`, () => {
        expect(testRenderer.root.findByType(Text)).toBeDefined()
    });

});
