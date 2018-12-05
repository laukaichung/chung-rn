import * as React from 'react'
import {ReactNode} from 'react'
import {Text, View} from "react-native";
import {CustomTouchableHighlight} from "../custom-touchable-highlight";
import Styles from "../style";
import ChungImage from "../chung-image";
import ThemeContext from "../theme-provider/ThemeContext";

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
            <ThemeContext.Consumer>
                {
                    ({isDarkMode}) =>
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
                                                        <View style={[Styles.accordionHeaderContainerStyle]}>
                                                            <Text style={Styles.accordionHeaderTextColor}>
                                                                {p.title}
                                                            </Text>
                                                            {
                                                                isActive ?
                                                                    <ChungImage
                                                                        style={Styles.iconButtonStyle}
                                                                        source={require('../../images/arrow-up.png')}/>
                                                                    :
                                                                    <ChungImage
                                                                        style={Styles.iconButtonStyle}
                                                                        source={require('../../images/arrow-down.png')}/>
                                                            }
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
                }
            </ThemeContext.Consumer>
        )
    }
}

