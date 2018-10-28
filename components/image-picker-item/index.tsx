import * as React from 'react';
import {Image, PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {Styles} from "../style/Styles";
import List from "../list/List";
import Label from "../label";
import {CameraRollFile} from "../type";
import Grid from "../grid";

export interface ImagePickerPropTypes {
    style?: {};
    images?: CameraRollFile[];
    onOpenCameraRollImageList: () => void;
    onRemoveImages: (image: CameraRollFile) => void;
    multiple?: boolean;
    accept?: string;
}

export default class ImagePickerItem extends React.Component<ImagePickerPropTypes, any> {

    public render() {
        const {images, onRemoveImages, onOpenCameraRollImageList} = this.props;
        return (
            <React.Fragment>
                <List.Item arrow="horizontal" onClick={onOpenCameraRollImageList}>
                    <Label content={"Select Images"}/>
                </List.Item>
                {
                    images.length > 0 &&
                    <List.Item>
                        <Grid
                            columnNum={3}
                            hasLine={false}
                            data={images}
                            renderItem={(file: CameraRollFile) => {
                                return (
                                    <View style={[styles.item, styles.size]}>
                                        <Image source={{uri: file.uri}}
                                               resizeMethod="resize"
                                               style={[styles.size, styles.image] as any}/>
                                        <TouchableOpacity
                                            onPress={() => onRemoveImages(file)}
                                            style={styles.closeWrap}
                                            activeOpacity={0.6}>
                                            <Text style={styles.closeText}>×</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}

                        />
                    </List.Item>
                }
            </React.Fragment>
        );
    }

    public componentDidMount() {
        requestAndroidReadExteralStorage();
        // You need to implement the IOS permission yourself!
    }
}


async function requestAndroidReadExteralStorage() {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    'title': 'Permission To Load Photos From External Storage',
                    'message': 'Permissions have to be granted in order to list photos on your phones for you to choose.'
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

            } else {
                console.log("READ_EXTERNAL_STORAGE permission denied!")
            }
        } catch (err) {
            console.warn(err)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    size: {
        width: 80,
        height: 80,
    },
    item: {
        marginRight: Styles.marginSm,
        marginBottom: Styles.marginSm,
        overflow: 'hidden',
    },
    image: {
        overflow: 'hidden',
        borderRadius: Styles.radiusSm,
    },
    closeWrap: {
        width: 16,
        height: 16,
        backgroundColor: '#999',
        borderRadius: 8,
        position: 'absolute',
        top: 4,
        right: 4,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    closeText: {
        color: Styles.colorTextBaseInverse,
        backgroundColor: 'transparent',
        fontSize: 20,
        height: 20,
        marginTop: -8,
        fontWeight: '300',
    },
    plusWrap: {
        borderRadius: Styles.radiusSm,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusWrapNormal: {
        backgroundColor: Styles.backgroundColor,
        borderColor: Styles.borderColor,
    },
    plusWrapHighlight: {
        backgroundColor: Styles.fillTap,
        borderColor: Styles.borderColor,
    },
    plusText: {
        fontSize: 64,
        backgroundColor: 'transparent',
        fontWeight: '100',
        color: Styles.colorTextCaption,
    },
});
