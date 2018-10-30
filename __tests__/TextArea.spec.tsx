import * as React from 'react'
import * as renderer from 'react-test-renderer';
import {ReactTestRenderer} from 'react-test-renderer';
import {Image, TextInput, TouchableWithoutFeedback} from 'react-native';
import TextAreaItem from "../components/textarea-item";

const DEFAULT_VALUE = "hello";

describe(`TextArea`, () => {
    let testRenderer: ReactTestRenderer;
    beforeAll(async () => {
        testRenderer = renderer.create((
            <TextAreaItem
                rows={5}
                defaultValue={DEFAULT_VALUE}
                error={true}
                label={"Text"}
                onChange={()=>{}}/>
        ));
    });

    it(`Check default value`, () => {
        expect(testRenderer.root.findByType(TextInput).props.defaultValue).toBe(DEFAULT_VALUE)
    });

    it(`Has Error View`, () => {
        expect(testRenderer.root.findByType(TouchableWithoutFeedback).findByType(Image)).toBeDefined()

    });

});
