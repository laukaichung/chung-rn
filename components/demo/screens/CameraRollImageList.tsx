import * as React from 'react'
import CameraRollList from "../../CameraRollImageList";
import {View} from "react-native";
import Button from "../../Button";
import {RefObject} from "react";
import {CameraRollFile} from "../../type";
import {NavigationProps} from "../demotype";

interface Props {
    onConfirm: (files:CameraRollFile[]) => void
}

interface State {

}

export class CameraRollImageList extends React.Component<NavigationProps<Props>, State> {
    private ref:RefObject<CameraRollList>;
    constructor(props) {
        super(props);
        this.ref = React.createRef()
    }

    public render() {
        return (
            <View style={{flex:1}}>
                <View>
                    <Button onPress={()=>this.props.navigation.state.params.onConfirm(this.ref.current._getSelectedImages())}>Confirm</Button>
                    <Button onPress={this.props.navigation.goBack}>Cancel</Button>
                </View>
                <CameraRollList ref={this.ref}/>
            </View>
        )
    }
}


