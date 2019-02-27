import * as React from 'react'
import {createRef, RefObject} from 'react'
import {NavigationProps} from "../demotype";
import {ScrollView, TouchableHighlight, View} from "react-native";
import Container from "../../UIMainContainer";
import Card from "../../Card";
import ChungText from "../../ChungText";
import WhiteSpace from "../../WhiteSpace";

interface TestState {
    isVisible: boolean

}

export default class TestScreen extends React.Component<NavigationProps, TestState> {
    public state: TestState = {isVisible: true};

    public render() {
        return (
            <Container>
                <ScrollView>
                    <View style={{flex: 1, flexDirection: "column", justifyContent: "center"}}>
                        <Card>
                        </Card>
                    </View>
                    <ChungText>
                        If neither fromRect or fromView are provided, the popover will float in the center of the screen.
                        rect is an object with the following properties:object yourself, or import Popoverfrom 'react-native-popover-view and create a rect by calling new Rect(x, y, width, height).
                        Likewise, size is an object with the following propertiesYou can create the object yourself, or import Popover from 'react-native-popover-view and create a rect by calling new Size(width, height).
                    </ChungText>
                    <WhiteSpace/>
                    <ChungText>
                        If neither fromRect or fromView are provided, the popover will float in the center of the screen.
                        rect is an object with the following properties:object yourself, or import Popoverfrom 'react-native-popover-view and create a rect by calling new Rect(x, y, width, height).
                        Likewise, size is an object with the following propertiesYou can create the object yourself, or import Popover from 'react-native-popover-view and create a rect by calling new Size(width, height).
                    </ChungText>
                    <WhiteSpace/>
                    <ChungText>
                        If neither fromRect or fromView are provided, the popover will float in the center of the screen.
                        rect is an object with the following properties:object yourself, or import Popoverfrom 'react-native-popover-view and create a rect by calling new Rect(x, y, width, height).
                        Likewise, size is an object with the following propertiesYou can create the object yourself, or import Popover from 'react-native-popover-view and create a rect by calling new Size(width, height).
                    </ChungText>
                    <WhiteSpace/>
                    <ChungText>
                        If neither fromRect or fromView are provided, the popover will float in the center of the screen.
                        rect is an object with the following properties:object yourself, or import Popoverfrom 'react-native-popover-view and create a rect by calling new Rect(x, y, width, height).
                        Likewise, size is an object with the following propertiesYou can create the object yourself, or import Popover from 'react-native-popover-view and create a rect by calling new Size(width, height).
                    </ChungText>
                    <WhiteSpace/>
                    <ChungText>
                        If neither fromRect or fromView are provided, the popover will float in the center of the screen.
                        rect is an object with the following properties:object yourself, or import Popoverfrom 'react-native-popover-view and create a rect by calling new Rect(x, y, width, height).
                        Likewise, size is an object with the following propertiesYou can create the object yourself, or import Popover from 'react-native-popover-view and create a rect by calling new Size(width, height).
                    </ChungText>
                    <WhiteSpace/>
                    <ChungText>
                        If neither fromRect or fromView are provided, the popover will float in the center of the screen.
                        rect is an object with the following properties:object yourself, or import Popoverfrom 'react-native-popover-view and create a rect by calling new Rect(x, y, width, height).
                        Likewise, size is an object with the following propertiesYou can create the object yourself, or import Popover from 'react-native-popover-view and create a rect by calling new Size(width, height).
                    </ChungText>
                    <WhiteSpace/>
                    <ChungText>
                        If neither fromRect or fromView are provided, the popover will float in the center of the screen.
                        rect is an object with the following properties:object yourself, or import Popoverfrom 'react-native-popover-view and create a rect by calling new Rect(x, y, width, height).
                        Likewise, size is an object with the following propertiesYou can create the object yourself, or import Popover from 'react-native-popover-view and create a rect by calling new Size(width, height).
                    </ChungText>
                    <WhiteSpace/>
                    <ChungText>
                        If neither fromRect or fromView are provided, the popover will float in the center of the screen.
                        rect is an object with the following properties:object yourself, or import Popoverfrom 'react-native-popover-view and create a rect by calling new Rect(x, y, width, height).
                        Likewise, size is an object with the following propertiesYou can create the object yourself, or import Popover from 'react-native-popover-view and create a rect by calling new Size(width, height).
                    </ChungText>
                    <WhiteSpace/>
                    <ChungText>
                        If neither fromRect or fromView are provided, the popover will float in the center of the screen.
                        rect is an object with the following properties:object yourself, or import Popoverfrom 'react-native-popover-view and create a rect by calling new Rect(x, y, width, height).
                        Likewise, size is an object with the following propertiesYou can create the object yourself, or import Popover from 'react-native-popover-view and create a rect by calling new Size(width, height).
                    </ChungText>
                    <WhiteSpace/>
                </ScrollView>
            </Container>
        );
    }
}


