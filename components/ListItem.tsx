import * as React from 'react';
import {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle,} from 'react-native';
import Styles from "./Styles";
import CustomTouchableHighlight from "./CustomTouchableHighlight";
import ChungText from "./ChungText";
import Icon, {IconProps} from "./Icon";
import VerticalMiddleContainer from "./VerticalMiddleContainer";
import CustomSwipeable, {CustomSwipeableProps} from "./CustomSwipeable";

export type HideBorderOptions = "bottom" | "top" | "all" | "left" | "right"

export interface ListItemProps {
    align?: 'top' | 'middle' | 'bottom';
    disabled?: boolean;
    children?: ReactNode;
    thumb?: ReactNode;
    extra?: ReactNode;
    arrow?: 'right' | 'down' | 'up';
    wrap?: boolean;
    activeStyle?: React.CSSProperties;
    error?: boolean;
    platform?: 'android' | 'ios';
    onPress?: () => void;
    onLongPress?: () => void;
    style?: StyleProp<ViewStyle>;
    bottomExtraView?: ReactNode;
    iconProps?: IconProps;
    swipeableProps?: CustomSwipeableProps
    /**
     * ContainerFlex: Make {flex:1} available in CustomTouchableHighlight to make it fit the screen width automatically
     * when it is used with numColumns in FlatList.
     * Disable containerFlex for ActivityLogPanel.
     */
    hideBorder?: HideBorderOptions[];
}

export default class Item extends React.Component<ListItemProps, any> {

    render() {
        const {
            children,
            onLongPress,
            thumb,
            extra,
            arrow,
            iconProps,
            onPress,
            hideBorder,
            wrap,
            bottomExtraView,
            style,
            swipeableProps,
            ...restProps
        } = this.props;

        let numberOfLines = {};
        if (!wrap) {
            numberOfLines = {
                numberOfLines: 1,
            };
        }

        let contentDom;

        if (Array.isArray(children)) {

            contentDom = <View style={[styles.column]}>{children}</View>;

        } else {

            if (children && React.isValidElement(children)) {
                contentDom = <View style={[styles.column]}>{children}</View>;
            } else {
                contentDom = (
                    <View style={[styles.column]}>
                        <ChungText style={[styles.content]} {...numberOfLines}>
                            {children}
                        </ChungText>
                    </View>
                );
            }
        }

        let itemBorderStyle: StyleProp<ViewStyle> = {
            borderBottomWidth: Styles.borderWidth,
            borderTopWidth: Styles.borderWidth,
            borderColor: Styles.borderColor
        };

        if (hideBorder) {

            if (hideBorder.indexOf("bottom") > -1) {
                itemBorderStyle.borderBottomWidth = 0;
            }

            if (hideBorder.indexOf("top") > -1) {
                itemBorderStyle.borderTopWidth = 0;
            }

            if (hideBorder.indexOf("all") > -1) {
                itemBorderStyle.borderTopWidth = 0;
                itemBorderStyle.borderBottomWidth = 0;
            }


        }

        const itemView = (
            <View {...restProps}
                  style={[itemBorderStyle, {paddingVertical: Styles.padding, paddingLeft: Styles.padding}, style]}>
                <View style={{
                    padding: Styles.padding / 2,
                    flexDirection: 'row',
                    flexWrap: "wrap",
                    justifyContent: 'space-between',
                }}
                >
                    {
                        (thumb || iconProps) &&
                        <VerticalMiddleContainer style={{marginRight: Styles.margin}}>
                            {thumb}
                            {
                                iconProps && <Icon {...iconProps}/>
                            }
                        </VerticalMiddleContainer>
                    }
                    {contentDom}
                    {
                        (extra || arrow) &&
                        <VerticalMiddleContainer style={[{marginLeft: Styles.margin}]}>
                            {
                                extra
                            }
                            {arrow && <Icon name={`angle-${arrow}`}/>}
                        </VerticalMiddleContainer>
                    }
                </View>
                {bottomExtraView}
            </View>
        );

        const listItem = (
            <CustomTouchableHighlight
                onPress={onPress}
                onLongPress={onLongPress}>
                {itemView}
            </CustomTouchableHighlight>
        );

        if(swipeableProps){
            return (
                <CustomSwipeable
                    rightContainerStyle={itemBorderStyle}
                    leftContainerStyle={itemBorderStyle}
                    {...swipeableProps}
                >
                    {listItem}
                </CustomSwipeable>
            )

        }else {
            return listItem
        }
    }
}

const styles = StyleSheet.create({
    line: {
        //flex: 1,
        //flexDirection: 'row',
        //alignItems: 'center',
        paddingRight: Styles.padding,
        //paddingVertical: Styles.paddingLg,
        minHeight: Styles.listItemHeight,
    },
    thumb: {
        width: Styles.iconSizeMd,
        height: Styles.iconSizeMd,
        marginRight: Styles.margin,
    },
    content: {
        textAlignVertical: 'center',
        paddingVertical: Styles.padding
    },
    extra: {
        textAlign: 'right',
        textAlignVertical: 'center',
    },
    item: {
        flexGrow: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    column: {
        flex: 1,
        flexDirection: 'column',
    },
});
