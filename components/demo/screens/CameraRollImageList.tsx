import * as React from 'react'
import {RefObject} from 'react'
import CameraRollList from "../../CameraRollImageList";
import {View} from "react-native";
import Button from "../../Button";
import {CameraRollFile} from "../../type";
import {NavigationProps} from "../demotype";
import {PermissionUtil} from "../../util/PermissionUtil";

interface Props {
    onConfirm: (files: CameraRollFile[]) => void
}

interface State {
    permissionRequested: boolean;
}

export class CameraRollImageList extends React.Component<NavigationProps<Props>, State> {
    public state = {} as State;
    private ref: RefObject<CameraRollList>;

    constructor(props) {
        super(props);
        this.ref = React.createRef()
    }

    public render() {

        if (!this.state.permissionRequested) {
            return null;
        }

        return (
            <View style={{flex: 1}}>
                <View>
                    <Button
                        onPress={() => this.props.navigation.state.params.onConfirm(this.ref.current._getSelectedImages())}>Confirm</Button>
                    <Button onPress={this.props.navigation.goBack}>Cancel</Button>
                </View>
                <CameraRollList ref={this.ref}/>
            </View>
        )
    }

    public async componentWillMount() {
        let res = await PermissionUtil.androidReadExteralStorage();
        console.log(res);
        if (!res.error)
            this.setState({permissionRequested: res.granted});
    }
}



