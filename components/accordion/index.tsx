import * as React from 'react'
import {ReactNode} from 'react'
import {Text, StyleSheet,Image, View} from "react-native";
import {CustomTouchableHighlight} from "../misc/CustomTouchableHighlight";
import {Styles} from "../style/Styles";

export interface CustomAccordionPaneProps {
    render: () => ReactNode
    title: string
}

interface CustomAccordionContainterProps {
    panes: CustomAccordionPaneProps[]
    defaultIndices: number[]
    customTitleContainer?: (data: { pane: CustomAccordionPaneProps, isActive: boolean }) => ReactNode
}

interface CustomAccordionState {
    activeIndices: number[]
}

export default class Accordion extends React.Component<CustomAccordionContainterProps, CustomAccordionState> {
    public state = {activeIndices: []} as CustomAccordionState;

    constructor(props) {
        super(props);
        this.state = {activeIndices: this.props.defaultIndices}
    }

    public render() {

        let {panes, customTitleContainer} = this.props;
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
                                        customTitleContainer ?
                                            customTitleContainer({pane: p, isActive}) :
                                            <View style={styles.accordionTitleContainer}>
                                                <Text style={styles.accordionTitle}>
                                                    {p.title}
                                                </Text>
                                                {
                                                    isActive ?
                                                    <Image
                                                        style={Styles.iconButtonStyle}
                                                        source={require('../../images/arrow-up.png')}/>
                                                        :
                                                    <Image
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
        )
    }
}

const styles = StyleSheet.create({
    accordionTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor:'#c6d2e2',
        // borderTopWidth:2,
        // borderTopColor:'#d3d3d3',
        borderBottomWidth:1,
        borderBottomColor:"#b7c2d2"
    },

    accordionTitle: {
        fontWeight: "bold",
        fontSize: 20,
    }
});