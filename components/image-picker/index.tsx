import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View,} from 'react-native';
import ImageRoll from './ImageRoll';
import {ImagePickerPropTypes} from './PropsType';
import {Styles} from "../style/Styles";

export interface ImagePickerPropTypes {
    style?: {};
    files?: Array<{}>;
    onChange?: (files: Array<{}>, operationType: string, index?: number) => void;
    onImageClick?: (index?: number, files?: Array<{}>) => void;
    onAddImageClick?: () => void;
    onFail?: (msg: string) => void;
    selectable?: boolean;
    multiple?: boolean;
    accept?: string;
}

interface State {
    visible: boolean
}

export default class ImagePicker extends React.Component<ImagePickerPropTypes, State> {
    static defaultProps = {selectable: true};

    plusText: any;
    plusWrap: any;

    public constructor(props: ImagePickerPropTypes) {
        super(props);
        this.state = {visible: false};
    }

    public render() {
        const {files = [], selectable} = this.props;
        return (
            <View style={styles.container}>
                {
                    files.map((item: any, index) => (
                        <View key={index} style={[styles.item, styles.size]}>
                            <TouchableOpacity
                                onPress={() => this.onImageClick(index)}
                                activeOpacity={0.6}>
                                <Image source={{uri: item.url}} style={[styles.size, styles.image] as any}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.removeImage(index)}
                                style={styles.closeWrap}
                                activeOpacity={0.6}>
                                <Text style={styles.closeText}>×</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                }
                {selectable && (
                    <TouchableWithoutFeedback
                        onPress={this.showPicker}
                        onPressIn={this.onPressIn}
                        onPressOut={this.onPressOut}>
                        <View
                            ref={conponent => (this.plusWrap = conponent)}
                            style={[
                                styles.item,
                                styles.size,
                                styles.plusWrap,
                                styles.plusWrapNormal,
                            ]}>
                            <Text style={[styles.plusText]}>+</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )}
                {
                    this.state.visible &&
                    <ImageRoll
                        onCancel={this.hideImageRoll}
                        onSelected={imgObj => this.addImage(imgObj)}
                    />
                }
            </View>
        );
    }

    onPressIn = () => {
        this.plusWrap.setNativeProps({
            style: [styles.item, styles.size, styles.plusWrapHighlight],
        });
    }

    onPressOut = () => {
        this.plusWrap.setNativeProps({
            style: [styles.item, styles.size, styles.plusWrapNormal],
        });
    }

    showPicker = () => {
        if (this.props.onAddImageClick) {
            this.props.onAddImageClick();
            return;
        }
        this.setState({
            visible: true,
        });
    }

    addImage(imageObj: any) {
        if (!imageObj.url) {
            imageObj.url = imageObj.uri;
            delete imageObj.uri;
        }
        const {files = []} = this.props;
        const newImages = files.concat(imageObj);
        if (this.props.onChange) this.props.onChange(newImages, 'add');
    }

    removeImage(idx: number): void {
        const newImages: any[] = [];
        const {files = []} = this.props;
        files.forEach((image, index) => {
            if (index !== idx) {
                newImages.push(image);
            }
        });
        if (this.props.onChange) this.props.onChange(newImages, 'remove', idx);
    }

    hideImageRoll = () => {
        this.setState({
            visible: false,
        });
        if (this.props.onFail) this.props.onFail('cancel image selection');
    };

    onImageClick(index: number) {
        if (this.props.onImageClick) this.props.onImageClick(index, this.props.files);
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
