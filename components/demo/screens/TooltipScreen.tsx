import * as React from 'react'
import {createRef, RefObject} from 'react'
import {NavigationProps} from "../demotype";
import {LayoutRectangle, View} from "react-native";
import Container from "../../UIMainContainer";
import ToolTip from "../../tooltip/ToolTip";
import ChungText from "../../ChungText";
import Button from "../../Button";
import Card from "../../Card";
import CardBody from "../../CardBody";

interface TestState {
    targetIsVisible: boolean;
    targetLayout?: LayoutRectangle;

}

export default class TooltipScreen extends React.Component<NavigationProps, TestState> {

    private toolTipRef1: RefObject<ToolTip> = createRef();

    public render() {
        return (
            <Container>
                <View style={{flex:1, flexDirection: "column", justifyContent: "center"}}>
                    <Card>
                        <CardBody>
                            <View style={{flexDirection: "row", justifyContent: "center"}}>
                                <View>
                                    <ToolTip
                                        enabled
                                        storageKey={"dsfdsf it"}
                                        shouldCloseOnOverlayClick
                                        overlay={false}
                                        view={(
                                            <View>
                                                <ChungText>
                                                    fdsdsfsd asdsdadas ddas h gfghfgh gf h hgfhgfgfgh fgh
                                                </ChungText>
                                                <ChungText>
                                                    fdsdsfsd asdsdadas ddas h gfghfgh gf h hgfhgfgfgh fgh
                                                </ChungText>
                                                <Button onPress={()=> alert("ppp")}>Click This</Button>
                                            </View>
                                        )}
                                        ref={this.toolTipRef1}
                                        show={true}
                                    >
                                        <Button
                                            onPress={() => {
                                                this.toolTipRef1.current._open();
                                            }}
                                        >
                                            Click
                                        </Button>
                                    </ToolTip>
                                </View>
                            </View>
                            <ChungText numberOfLines={3}>
                                A Florida mom and pediatrician warned parents to better monitor their children’s
                                internet
                                activity after she found a disturbing clip that appeared to encourage children to harm
                                themselves, inserted into gaming videos on YouTube and YouTube Kids. Dr. Free Hess, from
                                Gainesville, Florida, found the 9-second-long suicide instructions sandwiched between
                                clips
                                of the Nintendo game Splatoon last week and shared it online to caution other parents.
                                "Remember kids, sideways for attention, longways for results," a man said while
                                demonstrating the cutting motion on his arm. "End it."
                                The man, identified by CBS News as YouTuber Filthy Frank, has over 6.2...
                            </ChungText>
                        </CardBody>
                    </Card>
                </View>
            </Container>
        );
    }
}

