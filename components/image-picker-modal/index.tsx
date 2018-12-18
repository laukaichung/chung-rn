import * as React from 'react';
import {RefObject} from 'react';
import {Image, PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import Styles from "../style";
import List from "../list/List";
import Label from "../label";
import Grid from "../grid";
import CustomModal from "../modal";
import Button from "../button";
import CameraRollImageList from "../camera-roll-image-list";
import {CameraRollFile, FormListItemCommonProps} from "../type";
import {ListItemProps} from "../list/ListItem";

interface ImagePickerModalProps extends FormListItemCommonProps {
    images?: CameraRollFile[];
    onRemoveImages: (image: CameraRollFile) => void;
    onConfirm: (images: CameraRollFile[]) => void;
    multiple?: boolean;
}

export default class ImagePickerModal extends React.Component<ImagePickerModalProps, any> {
    private ref: RefObject<CameraRollImageList>;

    public constructor(props) {
        super(props);
        this.ref = React.createRef()
    }

    public render() {
        const {images, onRemoveImages,listItemProps = {}, onConfirm,multiple} = this.props;
        return (
            <React.Fragment>
                <CustomModal
                    fullScreen
                    paddingHorizontal={false}
                    buttonTrigger={(
                        <List.Item {...listItemProps} arrow="horizontal">
                            <Label text={"Select Images"}/>
                        </List.Item>
                    )}>
                    {
                        ({closeModal}) => {
                            return (
                                <View>
                                    <View style={{position: 'absolute', right: 5, bottom: 5, zIndex: 999}}>
                                            <Button type="primary"
                                                    onPress={() => {
                                                        onConfirm(this.ref.current._getSelectedImages())
                                                        closeModal()
                                                    }}>
                                                Confirm
                                            </Button>
                                    </View>
                                    <CameraRollImageList defaultSelectedImages={images}
                                                         multiple={multiple}
                                                         ref={this.ref}/>
                                </View>
                            )
                        }
                    }
                </CustomModal>
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
                                            onPress={() => {
                                                this.ref.current._removeSelectedImage(file);
                                                onRemoveImages(file)
                                            }}
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
        color: Styles.whiteTextColor,
        backgroundColor: 'transparent',
        fontSize: 20,
        height: 20,
        marginTop: -8,
        fontWeight: '300',
    },

});
