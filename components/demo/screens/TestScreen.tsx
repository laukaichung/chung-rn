import * as React from 'react'
import {createRef, RefObject} from 'react'
import {NavigationProps} from "../demotype";
import {LayoutRectangle, View} from "react-native";
import Container from "../../UIMainContainer";
import ToolTip from "../../tooltip/ToolTip";
import ChungText from "../../ChungText";
import Icon from "../../Icon";
import ToolTipArrow from "../../tooltip/ToolTipArrow";
import Button from "../../Button";

interface TestState {
    targetIsVisible: boolean;
    targetLayout?: LayoutRectangle;

}

export default class TestScreen extends React.Component<NavigationProps, TestState> {
    private targetRef: RefObject<View> = createRef();
    private toolTipRef1: RefObject<ToolTip> = createRef();
    private toolTipRef2: RefObject<ToolTip> = createRef();

    render() {
        return (
            <Container>
                <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
                    <View>
                        <ToolTip
                            ref={this.toolTipRef1}
                            show={false}
                        >
                            <View style={{backgroundColor: "red", zIndex:1, position: "absolute", top: 260, left: 150 }}>
                                <Button
                                    onPress={()=>{
                                        alert("dsfdfdf")
                                        this.toolTipRef1.current._toggle();
                                    }}
                                >
                                    Click
                                </Button>

                            </View>
                        </ToolTip>
                    </View>

                    <View>
                        <ToolTip
                            ref={this.toolTipRef2}
                            show={false}>
                            <View style={{backgroundColor: "red"}}>
                                <Icon
                                    name="trash"
                                    onPress={()=>{
                                        this.toolTipRef2.current._toggle();
                                    }}
                                />
                            </View>
                        </ToolTip>
                    </View>

                </View>

            </Container>
        );
    }
}


