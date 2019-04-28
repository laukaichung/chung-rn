import * as React from 'react';
import {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Carousel from './Carousel';
import Styles from "./Styles";
import Flex from "./Flex";
import ScreenUtil from "./util/ScreenUtil";
import ChungText from "./ChungText";
import FlexItem from "./FlexItem";
import DeviceInfo from 'react-native-device-info';
import FastImage from "react-native-fast-image";
import {TestProps} from "./type";

interface DataItem {
    icon?: any;
    text?: any;

    [key: string]: any;
}

export interface GridProps extends TestProps{
    itemStyle?: StyleProp<ViewStyle>;
    data?: Array<DataItem | undefined>;
    showBorder?: boolean;
    tabletNumColumns?: number;
    mobileNumColumns?:number;
    numColumns?:number
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
        itemStyle: {},
    };

    public render() {
        const {
            data = [],
            showBorder = false,
            itemStyle = {},
            carouselMaxRow = 2,
            isCarousel = false,
            tabletNumColumns,
            mobileNumColumns,
            testID,
            onPress = () => {
            },
        } = this.props;

        let numColumns = this.props.numColumns || 3;
        if(mobileNumColumns || tabletNumColumns){
            numColumns =  DeviceInfo.isTablet()?tabletNumColumns:mobileNumColumns
        }

        const dataLength = (data && data.length) || 0;
        const rowCount = Math.ceil(dataLength / numColumns);

        const renderItem = this.props.renderItem ||
            ((dataItem: DataItem, index: number) => (
                <Flex
                    testID={testID}
                    direction="column"
                    justify="center"
                    style={{flex: 1}}
                    onPress={() => onPress(dataItem, index)}
                >
                    {React.isValidElement(dataItem.icon) ? (
                        dataItem.icon
                    ) : (
                        <FastImage source={{uri: dataItem.icon}} style={styles.icon}/>
                    )}
                    <ChungText style={{
                        fontSize: Styles.fontSizeSm,
                        color: Styles.fontColor,
                        marginTop: Styles.margin,
                    }}
                    >
                        {dataItem.text}
                    </ChungText>
                </Flex>
            ));

        const flexItemStyle = this.getFlexItemStyle(numColumns);
        const rowsArr: any[] = [];

        for (let i = 0; i < rowCount; i++) {
            const rowArr: any[] = [];
            for (let j = 0; j < numColumns; j++) {
                const dataIndex = i * numColumns + j;
                if (dataIndex < dataLength) {
                    const el = data && data[dataIndex];
                    rowArr.push(
                        <FlexItem
                            key={j}
                            style={[
                                styles.grayBorderBox,
                                flexItemStyle,
                                {borderLeftWidth: showBorder && j === 0 ? Styles.borderWidth : 0},
                                itemStyle,
                            ]}
                            onPress={() => onPress(el, dataIndex)}
                        >
                            {renderItem(el, dataIndex)}
                        </FlexItem>,
                    );
                } else {
                    rowArr.push(
                        <FlexItem key={j} style={[styles.grayBorderBox, flexItemStyle]}/>,
                    );
                }
            }
            const boxBorderStyle = {
                borderTopWidth: showBorder && i === 0 ? StyleSheet.hairlineWidth : 0,
                borderBottomWidth: showBorder ? StyleSheet.hairlineWidth : 0,
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
                        for (let jjj = 0; jjj < numColumns; jjj++) {
                            res.push(
                                <FlexItem
                                    key={jjj}
                                    style={[styles.grayBorderBox, flexItemStyle]}
                                />,
                            );
                        }
                        pageRows.push(
                            <Flex key={rowIndex}
                                  style={[styles.grayBorderBox, {borderBottomWidth: showBorder ? Styles.borderWidth : 0}]}>
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
                            {borderTopWidth: showBorder && pageIndex !== 0 ? Styles.borderWidth : 0},
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

    getFlexItemStyle(numColumns: number) {
        return {
            height: ScreenUtil.fullWidth() / numColumns,
            borderRightWidth: this.props.showBorder ? Styles.borderWidth : 0,
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
};
