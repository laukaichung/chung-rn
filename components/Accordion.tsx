import * as React from 'react'
import {ReactNode} from 'react'
import {Animated, StyleProp, TextStyle, View, ViewStyle} from "react-native";
import {CustomTouchableHighlight} from "./CustomTouchableHighlight";
import Styles from "./Styles";
import Icon from "./Icon";
import ChungText from "./ChungText";
import FadeIn, {FadeInProps} from "./FadeIn";

export interface AccordionPane {
    render: () => ReactNode
    title: string;
}

interface AccordionContainerProps {
    panes: AccordionPane[]
    defaultIndices: number[]
    headerStyle?: StyleProp<ViewStyle>
    headerTextStyle?: StyleProp<TextStyle>
    customHeaderContainer?: (data: { pane: AccordionPane, isActive: boolean }) => ReactNode
    fadeIn?: FadeInProps;
}

interface AccordionState {
    activeIndices: number[]
}

export default class Accordion extends React.Component<AccordionContainerProps, AccordionState> {
    public state = {activeIndices: []} as AccordionState;

    public constructor(props) {
        super(props);
        this.state = {activeIndices: this.props.defaultIndices}
    }

    public render() {

        const {panes, customHeaderContainer, fadeIn, headerStyle, headerTextStyle} = this.props;
        let {activeIndices} = this.state;
        return (
            <View>
                {
                    panes.map((p, idx) => {
                        const isActive = activeIndices.indexOf(idx) > -1;
                        return (
                            <React.Fragment key={idx}>
                                <CustomTouchableHighlight
                                    onPress={() => {
                                        if (isActive) {
                                            activeIndices = activeIndices.filter(o => {
                                                return o != idx
                                            })
                                        } else {
                                            activeIndices.push(idx);
                                        }
                                        this.setState({activeIndices})
                                    }}>
                                    {
                                        customHeaderContainer ?
                                            customHeaderContainer({pane: p, isActive}) :
                                            <View style={[Styles.accordionHeaderStyle, headerStyle]}>
                                                <ChungText style={[Styles.accordionHeaderTextColor, headerTextStyle]}>
                                                    {p.title}
                                                </ChungText>
                                                <Icon color={Styles.accordionIconColor}
                                                      name={isActive ? "angle-up" : "angle-down"}/>
                                            </View>
                                    }
                                </CustomTouchableHighlight>
                                {
                                    isActive &&
                                    <FadeIn {...fadeIn}>
                                        {
                                            p.render()
                                        }
                                    </FadeIn>

                                }
                            </React.Fragment>
                        )
                    })
                }
            </View>
        )
    }
}



