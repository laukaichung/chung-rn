import * as React from 'react'
import {ReactNode} from 'react'
import {Text, View} from "react-native";
import {CustomTouchableHighlight} from "./CustomTouchableHighlight";
import Styles from "./Styles";
import Icon from "./Icon";

export interface AccordionPane {
    render: () => ReactNode
    title: string
}

interface AccordionContainerProps {
    panes: AccordionPane[]
    defaultIndices: number[]
    customHeaderContainer?: (data: { pane: AccordionPane, isActive: boolean }) => ReactNode
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

        let {panes, customHeaderContainer} = this.props;
        let {activeIndices} = this.state;
        return (

            <View>
                {
                    panes.map((p, idx) => {
                        let isActive = activeIndices.indexOf(idx) > -1;
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
                                            <View style={[Styles.accordionHeaderStyle]}>
                                                <Text style={Styles.accordionHeaderTextColor}>
                                                    {p.title}
                                                </Text>
                                                <Icon color={Styles.accordionIconColor}
                                                            name={isActive?"angle-up":"angle-down"}/>

                                            </View>
                                    }
                                </CustomTouchableHighlight>
                                {
                                    isActive && p.render()
                                }
                            </React.Fragment>
                        )
                    })
                }
            </View>
        )
    }
}
