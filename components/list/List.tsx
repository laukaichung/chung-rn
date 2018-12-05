import * as React from 'react';
import {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Styles from "../style";
import ListItem from "./ListItem";
import ChungText from "../chung-text";
import ChungView from "../chung-view";
import ThemeContext from "../theme-provider/ThemeContext";

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
            <ThemeContext.Consumer>
                {
                    ()=>
                    <ChungView {...restProps as any} style={style}>
                        {
                            renderHeader && renderHeader()
                        }
                        {
                            headerText && this.renderHeaderOrFooterContainer(headerText, headerTitleContainerStyle)
                        }
                        <ChungView style={styles.body}>
                            {children}
                            <View style={[styles.bodyBottomLine]}/>
                        </ChungView>
                        {
                            renderFooter &&
                            <ChungView style={styles.footer}>
                                {renderFooter()}
                            </ChungView>
                        }
                        {
                            footerText && this.renderHeaderOrFooterContainer(footerText)
                        }
                    </ChungView>
                }
            </ThemeContext.Consumer>
        );
    }

    private renderHeaderOrFooterContainer(text: string, containerStyle?: StyleProp<ViewStyle>) {
        return (
            <ChungView style={[Styles.listHeaderContainerStyle, containerStyle]}>
                <ChungText style={styles.headerTitle}>{text}</ChungText>
            </ChungView>
        )
    }
}


const styles = StyleSheet.create({
    headerTitle: {
        color: Styles.headerColor,
        fontSize: Styles.HeaderFontSize
    },
    footer: {},
    body: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: Styles.borderColor,
    },
    bodyBottomLine: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Styles.borderColor,
    },
});
