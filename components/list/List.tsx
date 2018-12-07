import * as React from 'react';
import {ReactNode} from 'react';
import {StyleProp, StyleSheet, View,Text, ViewStyle} from 'react-native';
import Styles from "../style";
import ListItem from "./ListItem";
import UIContext from "../ui-provider/UIContext";

export interface ListProps {
    style?: StyleProp<ViewStyle>;
    renderHeader?: () => ReactNode
    headerTitleContainerStyle?: StyleProp<ViewStyle>
    headerText?: string;
    footerText?: string;
    renderFooter?: () => ReactNode
}

export default class List extends React.Component<ListProps, any> {

    public static Item = ListItem;

    public render() {
        const {children, style, renderHeader, headerText, footerText, headerTitleContainerStyle, renderFooter, ...restProps} = this.props;
        return (
            <UIContext.Consumer>
                {
                    ()=>
                    <View {...restProps as any} style={style}>
                        {
                            renderHeader && renderHeader()
                        }
                        {
                            headerText && this.renderHeaderOrFooterContainer(headerText, headerTitleContainerStyle)
                        }
                        <View style={{
                            borderTopWidth: StyleSheet.hairlineWidth,
                            borderTopColor: Styles.borderColor,
                        }}>
                            {children}
                            <View style={[{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: 1,
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                borderBottomColor: Styles.borderColor,
                            }]}/>
                        </View>
                        {
                            renderFooter && renderFooter()
                        }
                        {
                            footerText && this.renderHeaderOrFooterContainer(footerText)
                        }
                    </View>
                }
            </UIContext.Consumer>
        );
    }

    private renderHeaderOrFooterContainer(text: string, containerStyle?: StyleProp<ViewStyle>) {
        return (
            <View style={[Styles.listHeaderContainerStyle, containerStyle]}>
                <Text style={{color:Styles.listHeaderTextColor,fontSize:Styles.headerFontSize}}>{text}</Text>
            </View>
        )
    }
}
