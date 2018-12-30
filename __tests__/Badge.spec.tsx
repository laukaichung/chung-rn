import * as React from 'react'
import * as renderer from 'react-test-renderer';
import {ReactTestRenderer} from "react-test-renderer";
import {ActivityIndicator, PickerModal} from "../components";
import {PickerItem, PickerOption} from "../components/PickerModal";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Styles from "../components/Styles";
import Grid from "../components/Grid";
import Flex from "../components/Flex";
import {Text} from 'react-native';
import Badge from "../components/Badge";


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
