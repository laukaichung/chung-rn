import * as React from 'react'
import {NavigationProps} from "../demotype";
import Camera from "../../camera";

interface Props {

}

interface State {

}

export default class CameraScreen extends React.Component<NavigationProps<Props>, State> {

    public render() {
        return (
            <Camera/>
        )
    }
}
