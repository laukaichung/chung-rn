import * as React from 'react'
import * as renderer from 'react-test-renderer';
import {ReactTestRenderer} from "react-test-renderer";
import {ActivityIndicator, PickerModal} from "../components";
import {PickerItem, PickerOption} from "../components/picker-modal/PickerModal";
import Button from "../components/button/Button";
import Modal from "../components/modal/Modal";
import Styles from "../components/styles/Styles";
import Grid from "../components/grid/Grid";
import Flex from "../components/flex/Flex";
import {Text} from 'react-native';
import Badge from "../components/badge/Badge";


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
