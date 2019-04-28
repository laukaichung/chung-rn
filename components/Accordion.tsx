import * as React from 'react'
import {ReactNode, useState} from 'react'
import {StyleProp, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import Styles from "./Styles";
import Icon from "./Icon";
import ChungText from "./ChungText";
import FadeIn, {FadeInProps} from "./FadeIn";
import {TestProps} from "./type";

export interface AccordionPane extends TestProps{
    render: () => ReactNode
    title: string;
}

interface AccordionContainerProps extends TestProps{
    panes: AccordionPane[]
    defaultIndices: number[]
    headerStyle?: StyleProp<ViewStyle>
    headerTextStyle?: StyleProp<TextStyle>
    customHeaderContainer?: (data: { pane: AccordionPane, isActive: boolean }) => ReactNode
    fadeIn?: FadeInProps;
}

const Accordion = (props: AccordionContainerProps) => {
    const {panes, defaultIndices, customHeaderContainer, fadeIn, testID, headerStyle, headerTextStyle} = props;
    let [activeIndices, setActiveIndices] = useState<number[]>(defaultIndices);
    return (
        <View testID={testID}>
            {
                panes.map((pane, idx) => {
                    const isActive = activeIndices.indexOf(idx) > -1;
                    const {title, testID, render} = pane;
                    return (
                        <React.Fragment key={idx}>
                            <TouchableOpacity
                                testID={testID}
                                onPress={() => {
                                    if (isActive) {
                                        activeIndices = activeIndices.filter(o => {
                                            return o != idx
                                        })
                                    } else {
                                        activeIndices.push(idx);
                                    }
                                    setActiveIndices([...activeIndices]);
                                }}
                            >
                                {
                                    customHeaderContainer ?
                                        customHeaderContainer({pane, isActive}) :
                                        <View style={[Styles.accordionHeaderStyle, headerStyle]}>
                                            <ChungText style={[Styles.accordionHeaderTextColor, headerTextStyle]}>
                                                {title}
                                            </ChungText>
                                            <Icon color={Styles.accordionIconColor}
                                                  name={isActive ? "angle-up" : "angle-down"}/>
                                        </View>
                                }
                            </TouchableOpacity>
                            {
                                isActive &&
                                <FadeIn {...fadeIn}>
                                    {
                                        render()
                                    }
                                </FadeIn>

                            }
                        </React.Fragment>
                    )
                })
            }
        </View>
    )
};

export default Accordion;



