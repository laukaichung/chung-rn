import * as React from 'react'
import {CameraRoll, FlatList, GetPhotosParamType, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import ActivityIndicator from "../activity-indicator";
import Styles from "../style";
import {CameraRollFile} from "../type";
import ScreenUtil from "../util/ScreenUtil";

interface CustomCameraRollProps {
    // assetType?: CameraRollAssetType;
    // groupType?: CameraRollGroupType;
    multiple?:boolean;
    renderImage?: (props: { image: CameraRollFile, onSelected: (image: CameraRollFile) => void, isSelected: boolean }) => any;
    defaultSelectedImages?:CameraRollFile[];
    onItemSelected?:(image:CameraRollFile)=>void;
    // maxSelectedImageNo?:number;
}


interface State {
    loadingMore: boolean;
    initialLoading: boolean
    lastCursor: string;
    images: CameraRollFile[];
    selectedImages: CameraRollFile[]
    noMore?: boolean

}

export default class CameraRollImageList extends React.Component<CustomCameraRollProps, State> {

    public constructor(props) {
        super(props);
        this.state = {
            loadingMore: false,
            lastCursor: null,
            initialLoading: true,
            images: [],
            selectedImages: this.props.defaultSelectedImages || []
        }
    }

    public render() {
        const {renderImage,multiple = true,onItemSelected} = this.props;
        let {initialLoading, images, noMore, selectedImages} = this.state;
        if (initialLoading) return (<ActivityIndicator toast text={"Loading"}/>);

        return (
            <FlatList
                removeClippedSubviews={true}
                initialNumToRender={10}
                numColumns={3}
                onEndReached={() => {
                    if (!noMore) this.fetch()
                }}
                ListFooterComponent={(
                    !noMore && <ActivityIndicator text={"Loading"}/>
                )}
                data={images}
                keyExtractor={(item, index) => String(index)}
                renderItem={({item: image}) => {
                    let isSelected = selectedImages.find(o => o.uri === image.uri) != null;
                    let onSelected = (image: CameraRollFile) => {

                        let targetIdx = selectedImages.findIndex(o => o.uri === image.uri);
                        if(multiple) {
                            if (targetIdx > -1) {
                                selectedImages.splice(targetIdx, 1)
                            } else {
                                selectedImages.push(image)
                            }
                        }else{

                            if(targetIdx > -1){
                                selectedImages = [];
                            }else{
                                selectedImages = [image]
                            }
                        }

                        this.setState({selectedImages});

                        if(onItemSelected) onItemSelected(image);
                    };

                    if (renderImage) {
                        return renderImage({isSelected, image, onSelected})
                    }

                    return (
                        <ImageItem
                            image={image}
                            isSelected={isSelected}
                            onSelected={onSelected}
                        />
                    )
                }}/>
        )
    }

    public componentWillMount() {
        this.fetch();
    }

    //Exposed
    public _getSelectedImages() {
        return this.state.selectedImages
    }

    //Exposed
    public _removeSelectedImage(image: CameraRollFile) {
        let {selectedImages} = this.state;
        this.setState({selectedImages: selectedImages.filter(o => o.uri != image.uri)})
    }

    public _setSelectedImages(selectedImages:CameraRollFile[]){
        this.setState({selectedImages})
    }


    private fetch() {
        if (!this.state.loadingMore) {
            this.setState({loadingMore: true}, async () => {
                await this._fetch()
            });
        }
    }

    private async _fetch() {
        let {lastCursor, images} = this.state;
        try {

            let params = {
                first: 10,
            } as GetPhotosParamType;

            if(lastCursor) params.after = lastCursor;


            let data = await CameraRoll.getPhotos(params);

            let {edges} = data;
            var newState = {
                loadingMore: false,
                initialLoading: false,
            } as State;

            if (!data.page_info.has_next_page) {
                newState.noMore = true;
            }

            if (edges.length > 0) {
                newState.lastCursor = data.page_info.end_cursor;
                newState.images = images.concat(edges.map(({node: {type, image}}) => {
                    return {type, ...image} as CameraRollFile;
                }));
            }

            this.setState(newState);

        } catch (err) {
            console.log('Camera Roll Image Fetching Error:', err)
        }
    }
}

interface ImageItemProps {
    image: CameraRollFile;
    isSelected: boolean;
    onSelected: (returnedImage: CameraRollFile) => void;
}

const ImageItem = ({image, onSelected, isSelected}: ImageItemProps) => {

    return (
        <TouchableOpacity
            onPress={() => onSelected(image)}>
            <View style={{flex: 1}}>
                <Image
                    resizeMethod="resize"
                    source={{uri: image.uri}}
                    style={{height: 100, width: ScreenUtil.fullWidth() / 3}}/>
                {
                    isSelected && <Image style={styles.marker as any}
                                         source={require('../../images/image-picker-images/circle-check.png')}/>
                }
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    marker: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'transparent',
        width: 25,
        height: 25
    },
    wrapper: {
        flexGrow: 1,
        backgroundColor: Styles.backgroundColor
    },
    loader: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        flex: 1,
    },

    statusBarBg: {
        height: 5 * 4,
    },
    naviBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#d9d9d9',
        height: 11 * 4,
    },
    barTitle: {
        flex: 1,
        textAlign: 'center',
        fontWeight: '500',
        marginLeft: 7 * 4,
        fontSize: 16,
    },
    rightBtn: {
        width: 14 * 4,
        color: Styles.brandPrimary,
        fontSize: 16,
    },


    // marker: {
    //     position: 'absolute',
    //     top: 5,
    //     backgroundColor: 'transparent',
    // },
});
