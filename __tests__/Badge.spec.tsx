import * as React from 'react'
import * as renderer from 'react-test-renderer';
import {ReactTestRenderer} from "react-test-renderer";
import {ActivityIndicator, PickerModal} from "../components";
import {PickerItem, PickerOption} from "../components/picker-modal";
import Button from "../components/button";
import Modal from "../components/modal";
import Styles from "../components/style";
import Grid from "../components/grid";
import Flex from "../components/flex/Flex";
import {Text} from 'react-native';
import Badge from "../components/badge";


describe(`Badge`, () => {
    let testRenderer:ReactTestRenderer;
    beforeAll(async ()=>{
        testRenderer = renderer.create((
                <Badge text={"Loading"}/>
        ));
    });

    it(`Should contain Text component`, () => {
        expect(testRenderer.root.findByType(Text)).toBeDefined()
    });

});
