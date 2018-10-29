import * as React from 'react'
import {RNScreenProps} from "../demotype";
import ImagePickerModal from "../../image-picker-modal";
import List from "../../list/List";
import {CameraRollFile} from "../../type";

interface Props extends RNScreenProps {

}

interface State {
    images: CameraRollFile[]
}

export class ImagePickerItemModalScreen extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }

    public render() {
        let {images} = this.state;
        return (
            <List>
                <ImagePickerModal
                    onRemoveImages={(image) => images.filter(o => o.uri != image.uri)}
                    onConfirm={(images) => this.setState({images})}
                    images={images}/>
            </List>
        )
    }
}

