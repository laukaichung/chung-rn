import * as React from 'react';
import {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import Styles from "./Styles";
import ChungText from "./ChungText";
import {TestProps} from "./type";

type HideBorderOptions = "bottom" | "top" | "all"

export interface ListProps extends TestProps{
    style?: StyleProp<ViewStyle>;
    renderHeader?: () => ReactNode
    headerTitleContainerStyle?: StyleProp<ViewStyle>
    headerText?: string;
    footerText?: string;
    hideBorder?: HideBorderOptions[]
    renderFooter?: () => ReactNode
    children: ReactNode;
}

const List = (props: ListProps) => {

    const {
        children, style, hideBorder = [],
        renderHeader, headerText, footerText,
        headerTitleContainerStyle,
        renderFooter, ...restProps
    } = props;

    return (

        <View {...restProps as any} style={style}>
            {
                renderHeader && renderHeader()
            }
            {
                headerText && renderHeaderOrFooterContainer(headerText, headerTitleContainerStyle)
            }

            <View>
                {children}
            </View>
            {
                renderFooter && renderFooter()
            }
            {
                footerText && renderHeaderOrFooterContainer(footerText)
            }
        </View>
    );
};

function renderHeaderOrFooterContainer(text: string, containerStyle?: StyleProp<ViewStyle>) {
    return (
        <View style={[Styles.listHeaderContainerStyle, containerStyle]}>
            <ChungText
                style={{color: Styles.listHeaderTextColor, fontSize: Styles.headerFontSize}}>{text}</ChungText>
        </View>
    )
}

export default List;