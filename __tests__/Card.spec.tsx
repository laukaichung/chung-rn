import * as React from 'react'
import * as renderer from 'react-test-renderer';
import {ReactTestRenderer} from 'react-test-renderer';
import {Text} from 'react-native';
import Card from "../components/Card";

const text = {
    header:'header',
    body:'body',
    footer:'footer'
}

describe(`Card`, () => {
    let testRenderer:ReactTestRenderer;
    beforeAll(async ()=>{
        testRenderer = renderer.create((
            <Card>
                <Card.Header title={<Text>{text.header}</Text>}/>
                <Card.Body>
                    <Text>{text.body}</Text>
                </Card.Body>
                <Card.Footer extra={<Text>{text.footer}</Text>}/>
            </Card>
        ));
    });

    it(`Should contain Header component`, () => {
        expect(testRenderer.root.findByType(Card.Header).findByType(Text).props.children).toBe(text.header)
    });

    it(`Should contain Body component`, () => {
        expect(testRenderer.root.findByType(Card.Body).findByType(Text).props.children).toBe(text.body)
    });

    it(`Should contain Footer component`, () => {
        expect(testRenderer.root.findByType(Card.Footer).findAllByType(Text)[1].props.children).toBe(text.footer)
    });

});
