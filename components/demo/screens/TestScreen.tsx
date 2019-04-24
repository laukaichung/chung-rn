import * as React from 'react'
import {NavigationProps} from "../demotype";
import Container from "../../UIMainContainer";
import ChungText from "../../ChungText";
import WhiteSpace from "../../WhiteSpace";
import {useRef} from "react";

const TestScreen = () => {

    return (
        <Container>
            <ChungText>
                If neither fromRect or fromView are provided, the popover will float in the center of the screen.
                rect is an object with the following properties:object yourself, or import Popoverfrom
                'react-native-popover-view and create a rect by calling new Rect(x, y, width, height).
                Likewise, size is an object with the following propertiesYou can create the object yourself, or import
                Popover from 'react-native-popover-view and create a rect by calling new Size(width, height).
            </ChungText>
            <WhiteSpace/>
        </Container>
    );
};

export default TestScreen;


