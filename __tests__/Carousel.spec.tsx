import * as React from 'react'
import * as renderer from 'react-test-renderer';
import {ReactTestRenderer} from 'react-test-renderer';
import {Text} from 'react-native';
import Carousel from "../components/carousel";


describe(`Carousel`, () => {
    let testRenderer: ReactTestRenderer;
    beforeAll(async () => {
        testRenderer = renderer.create((
            <Carousel autoplay>
                <Text>Carousel 1</Text>
                <Text>Carousel 2</Text>
            </Carousel>
        ));
    });

    it(`Should contain all children`, () => {
        expect(testRenderer.root.findAllByType(Text).length).toBe(2)
    });

});
