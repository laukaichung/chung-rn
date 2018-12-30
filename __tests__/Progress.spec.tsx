import * as React from 'react'
import * as renderer from 'react-test-renderer';
import {ReactTestRenderer} from 'react-test-renderer';
import {Animated} from 'react-native';
import Progress from "../components/progress/Progress";

describe(`Progress`, () => {
    let testRenderer: ReactTestRenderer;
    beforeAll(async () => {
        testRenderer = renderer.create((
            <Progress barColor="red" appearTransition percentage={58}/>
        ));
    });

    it(`Check appearTransition prop` , () => {
        expect(testRenderer.root.findByType(Animated.View)).toBeDefined()
    });

});

