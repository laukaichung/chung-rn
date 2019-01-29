import * as React from 'react';
import {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import Styles from "./Styles";
import ListItem from "./ListItem";
import ChungText from "./ChungText";

type HideBorderOptions = "bottom" | "top" | "all"

export interface ListProps {
    style?: StyleProp<ViewStyle>;
    renderHeader?: () => ReactNode
    headerTitleContainerStyle?: StyleProp<ViewStyle>
    headerText?: string;
    footerText?: string;
    hideBorder?: HideBorderOptions[]
    renderFooter?: () => ReactNode
}

export default class List extends React.Component<ListProps, any> {

    public static Item = ListItem;

    public render() {
        const {children, style, hideBorder = [], renderHeader, headerText, footerText, headerTitleContainerStyle, renderFooter, ...restProps} = this.props;
        return (

            <View {...restProps as any} style={style}>
                {
                    renderHeader && renderHeader()
                }
                {
                    headerText && this.renderHeaderOrFooterContainer(headerText, headerTitleContainerStyle)
                }

                <View
                    // style={{
                    //     borderTopWidth: hideBorder.indexOf("top") === -1 && hideBorder.indexOf("all") === -1 ? Styles.borderWidth : null,
                    //     borderTopColor: Styles.borderColor,
                    // }}
                >

                    {children}
                    {/*<View*/}
                    {/*    style={[{*/}
                    {/*        position: 'absolute',*/}
                    {/*        bottom: 0,*/}
                    {/*        left: 0,*/}
                    {/*        right: 0,*/}
                    {/*        height: 1,*/}
                    {/*        borderBottomWidth: hideBorder.indexOf("bottom") === -1 && hideBorder.indexOf("all") === -1 ? Styles.borderWidth : null,*/}
                    {/*        borderBottomColor: Styles.borderColor,*/}
                    {/*    }]}*/}
                    {/*/>*/}
                </View>
                {
                    renderFooter && renderFooter()
                }
                {
                    footerText && this.renderHeaderOrFooterContainer(footerText)
                }
            </View>
        );
    }

    private renderHeaderOrFooterContainer(text: string, containerStyle?: StyleProp<ViewStyle>) {
        return (
            <View style={[Styles.listHeaderContainerStyle, containerStyle]}>
                <ChungText
                    style={{color: Styles.listHeaderTextColor, fontSize: Styles.headerFontSize}}>{text}</ChungText>
            </View>
        )
    }
}
