import * as React from 'react';
import {ReactNode} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import Styles from "../style";
import ListItem from "./ListItem";
import ChungText from "../chung-text";
import ChungView from "../chung-view";

export interface ListProps {
    style?: StyleProp<ViewStyle>;
    renderHeader?: () => ReactNode
    headerTitleContainerStyle?:StyleProp<ViewStyle>
    headerTitle?:string;
    renderFooter?: () => ReactNode
}

export default class List extends React.Component<ListProps, any> {
    public static Item = ListItem;
    public render() {
        const {children, style, renderHeader, headerTitle,headerTitleContainerStyle,renderFooter, ...restProps} = this.props;
        return (
            <ChungView {...restProps as any} style={style}>
                {
                    renderHeader && renderHeader()
                }
                {
                    headerTitle &&
                    <ChungView style={[styles.headerTitleContainer,headerTitleContainerStyle]}>
                        <ChungText style={styles.headerTitle}>{headerTitle}</ChungText>
                    </ChungView>
                }
                <ChungView style={styles.body}>
                    {children}
                    <ChungView style={[styles.bodyBottomLine]}/>
                </ChungView>
                {
                    renderFooter &&
                    <ChungView style={styles.footer}>
                        {renderFooter()}
                    </ChungView>
                }
            </ChungView>
        );
    }
}


const styles = StyleSheet.create({
    headerTitleContainer:{
        padding:Styles.padding,
        backgroundColor: "#e4e4e4"
    },
    headerTitle:{
        color: Styles.headerColor,
        fontSize: Styles.HeaderFontSize
    },
    footer: {

    },
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
