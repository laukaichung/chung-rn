import * as React from 'react'
import {RNScreenProps} from "../demotype";
import CameraRollList from "../../camera-roll-image-list";
import {View} from "react-native";
import Button from "../../button";
import {RefObject} from "react";
import {CameraRollFile} from "../..";

interface Props extends RNScreenProps {
    params: { onConfirm: (files:CameraRollFile[]) => void }
}

interface State {

}

export class CameraRollImageList extends React.Component<Props, State> {
    private ref:RefObject<CameraRollList>;
    constructor(props) {
        super(props);
        this.ref = React.createRef()
    }

    public render() {
        return (
            <View style={{flex:1}}>
                <View>
                    <Button onClick={()=>this.props.navigation.state.params.onConfirm(this.ref.current._getSelectedImages())}>Confirm</Button>
                    <Button onClick={this.props.navigation.goBack}>Cancel</Button>
                </View>
                <CameraRollList ref={this.ref}/>
            </View>
        )
    }
}

