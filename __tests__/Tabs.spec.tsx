import * as React from 'react'
import * as renderer from 'react-test-renderer';
import {ReactTestRenderer} from 'react-test-renderer';
import {Text} from 'react-native';
import Tabs from "../components/Tabs";

describe(`Tabs`, () => {
    let testRenderer: ReactTestRenderer;
    beforeAll(async () => {
        testRenderer = renderer.create((
            <Tabs tabs={[{title:"A"},{title:"B"}]}>
                <Text>A</Text>
                <Text>B</Text>
            </Tabs>
        ));
    });

    // it(`Should contain a tab pane` , () => {
    //     expect(testRenderer.root.findAllByType(Text).length).toBe(1);
    //
    // });

});

