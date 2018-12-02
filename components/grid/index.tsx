import * as React from 'react';
import {Image, StyleProp, StyleSheet, Text, View, ViewStyle,} from 'react-native';
import Carousel from '../carousel';
import Styles from "../style";
import {ReactNode} from "react";
import Flex from "../flex/Flex";
import ScreenUtil from "../util/ScreenUtil";

interface DataItem {
    icon?: any;
    text?: any;

    [key: string]: any;
}

interface GridProps {
    itemStyle?: StyleProp<ViewStyle>;
    data?: Array<DataItem | undefined>;
    hasLine?: boolean;
    columnNum?: number;
    isCarousel?: boolean;
    carouselMaxRow?: number;
    onPress?: (dataItem: DataItem | undefined, itemIndex: number) => void;
    renderItem?: (
        dataItem: DataItem | undefined,
        itemIndex: number,
    ) => ReactNode
}

export default class Grid extends React.Component<GridProps, any> {
    static defaultProps = {
        data: [],
        hasLine: true,
        isCarousel: false,
        columnNum: 4,
        carouselMaxRow: 2,
        itemStyle: {},
    };

    public render() {
        const {
            data,
            hasLine,
            isCarousel,
            onPress = () => {
            },
        } = this.props;
        const columnNum = this.props.columnNum as number;
        const customItemStyle = this.props.itemStyle;
        const carouselMaxRow = this.props.carouselMaxRow as number;
        const dataLength = (data && data.length) || 0;
        const rowCount = Math.ceil(dataLength / columnNum);

        const renderItem =
            this.props.renderItem ||
            ((dataItem: DataItem, index: number) => (
                <Flex
                    direction="column"
                    justify="center"
                    style={{flex: 1}}
                    onPress={() => onPress(dataItem, index)}
                >
                    {React.isValidElement(dataItem.icon) ? (
                        dataItem.icon
                    ) : (
                        <Image source={{uri: dataItem.icon}} style={styles.icon}/>
                    )}
                    <Text style={styles.text}>{dataItem.text}</Text>
                </Flex>
            ));

        const flexItemStyle = this.getFlexItemStyle(columnNum);
        const rowsArr: any[] = [];

        for (let i = 0; i < rowCount; i++) {
            const rowArr: any[] = [];
            for (let j = 0; j < columnNum; j++) {
                const dataIndex = i * columnNum + j;
                if (dataIndex < dataLength) {
                    const el = data && data[dataIndex];
                    rowArr.push(
                        <Flex.Item
                            key={j}
                            style={[
                                styles.grayBorderBox,
                                flexItemStyle,
                                {borderLeftWidth: hasLine && j === 0 ? StyleSheet.hairlineWidth : 0},
                                customItemStyle,
                            ]}
                            onPress={() => onPress(el, dataIndex)}
                        >
                            {renderItem(el, dataIndex)}
                        </Flex.Item>,
                    );
                } else {
                    rowArr.push(
                        <Flex.Item key={j} style={[styles.grayBorderBox, flexItemStyle]}/>,
                    );
                }
            }
            const boxBorderStyle = {
                borderTopWidth: hasLine && i === 0 ? StyleSheet.hairlineWidth : 0,
                borderBottomWidth: hasLine ? StyleSheet.hairlineWidth : 0,
            };
            rowsArr.push(
                <Flex key={i} style={[styles.grayBorderBox, boxBorderStyle]}>
                    {rowArr}
                </Flex>,
            );
        }

        const pageCount = Math.ceil(rowCount / carouselMaxRow);
        const pagesArr: any[] = [];
        if (isCarousel && pageCount > 1) {
            for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
                const pageRows: any[] = [];
                for (let ii = 0; ii < carouselMaxRow; ii++) {
                    const rowIndex = pageIndex * carouselMaxRow + ii;
                    if (rowIndex < rowCount) {
                        pageRows.push(rowsArr[rowIndex]);
                    } else {
                        const res: any = [];
                        for (let jjj = 0; jjj < columnNum; jjj++) {
                            res.push(
                                <Flex.Item
                                    key={jjj}
                                    style={[styles.grayBorderBox, flexItemStyle]}
                                />,
                            );
                        }
                        pageRows.push(
                            <Flex key={rowIndex}
                                  style={[styles.grayBorderBox, {borderBottomWidth: hasLine ? Styles.borderWidth : 0}]}>
                                {res}
                            </Flex>,
                        );
                    }
                }
                pagesArr.push(
                    <View
                        key={pageIndex}
                        style={[
                            styles.grayBorderBox,
                            {borderTopWidth: hasLine && pageIndex !== 0 ? StyleSheet.hairlineWidth : 0},
                        ]}
                    >
                        {pageRows}
                    </View>,
                );
            }
        }

        return isCarousel && pageCount > 1 ? (
            <Carousel infinite={false} dots>
                {pagesArr}
            </Carousel>
        ) : (
            <Flex direction="column">{rowsArr}</Flex>
        );
    }

    getFlexItemStyle(columnNum: number) {
        return {
            height: ScreenUtil.fullWidth() / columnNum,
            borderRightWidth: this.props.hasLine ? StyleSheet.hairlineWidth : 0,
        };
    }

}

export const styles = {
    grayBorderBox: {
        borderColor: Styles.borderColor,
    },
    icon: {
        width: Styles.iconSizeSm,
        height: Styles.iconSizeSm,
    },
    text: {
        fontSize: Styles.fontSizeCaptionSm,
        color: Styles.textBaseColor,
        marginTop: Styles.margin,
    },
};
