import * as React from 'react'
import {RNScreenProps} from "../demotype";
import {screenKeys} from "../data/ScreenKeys";
import ImagePickerItem from "../../image-picker-item";
import {CameraRollFile} from "../../type";

interface ImagePickerScreenProps extends RNScreenProps {

}

interface State {
    images: CameraRollFile[]
}

export class ImagePickerScreen extends React.Component<ImagePickerScreenProps, State> {

    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }

    public render() {
        let {images} = this.state;
        return (
            <React.Fragment>
                <ImagePickerItem
                    onRemoveImages={(image) => this.setState({images: images.filter(o => o.uri != image.uri)})}
                    images={images}
                    onOpenCameraRollImageList={
                        () => this.props.navigation.navigate(screenKeys.imagePickerCameraRoll,
                            {
                                onConfirm: (images) => {
                                    this.setState({images})
                                }
                            }
                        )}
                />
            </React.Fragment>
        )
    }
}

