import * as React from 'react'
import {CameraRoll, FlatList, GetPhotosParamType, Image, Platform, TouchableOpacity, View} from "react-native";
import ActivityIndicator from "./ActivityIndicator";
import {CameraRollFile} from "./type";
import ScreenUtil from "./util/ScreenUtil";
import Icon from "./Icon";
import {ChungStyles} from ".";
import DeviceInfo from 'react-native-device-info';

interface CustomCameraRollProps {
    // assetType?: CameraRollAssetType;
    // groupType?: CameraRollGroupType;
    multiple?: boolean;
    renderImage?: (props: { image: CameraRollFile, onSelected: (image: CameraRollFile) => void, isSelected: boolean }) => any;
    defaultSelectedImages?: CameraRollFile[];
    onItemSelected?: (image: CameraRollFile, allImages: CameraRollFile[]) => void;
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
        const {renderImage, multiple = true, onItemSelected} = this.props;
        let {initialLoading, images, noMore, selectedImages} = this.state;
        if (initialLoading) return (<ActivityIndicator toast text={"Loading"}/>);

        return (
            <FlatList
                removeClippedSubviews={true}
                initialNumToRender={10}
                numColumns={DeviceInfo.isTablet() ? 4 : 3}
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
                        //console.log({image});
                        let targetIdx = selectedImages.findIndex(o => o.uri === image.uri);
                        if (multiple) {
                            if (targetIdx > -1) {
                                selectedImages.splice(targetIdx, 1)
                            } else {
                                selectedImages.push(image)
                            }
                        } else {

                            if (targetIdx > -1) {
                                selectedImages = [];
                            } else {
                                selectedImages = [image]
                            }
                        }

                        this.setState({selectedImages});

                        if (onItemSelected) onItemSelected(image, selectedImages);
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

    public _setSelectedImages(selectedImages: CameraRollFile[]) {
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
                /*groupTypes must be provided in IOS. Otherwise, it will cause:
                  json value null of type nsnull cannot be converted to nsString
                */
            } as GetPhotosParamType;

            if (lastCursor) params.after = lastCursor;

            // If you add groupTypes in Android, it would throw `groupTypes is not supported` error
            if (Platform.OS === "ios") params.groupTypes = "SavedPhotos";

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
                    isSelected &&
                    <Icon
                        color={"red"}
                        size={"sm"}
                        style={{position: "absolute", top: ChungStyles.margin, right: ChungStyles.margin}}
                        name={"check-circle-o"}
                    />
                }
            </View>
        </TouchableOpacity>
    )


};


