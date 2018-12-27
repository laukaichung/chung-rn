import * as React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {RNCamera, TakePictureResponse} from 'react-native-camera';
import {ReactNode, RefObject} from "react";
import Button from "../button";
import {ChungStyles} from "../index";

interface CameraProps {
    onCapture: (picture: TakePictureResponse) => void;
    snapTextView: ReactNode
}

export default class Camera extends React.Component<CameraProps> {
    public camera: RefObject<RNCamera> = React.createRef();

    public render() {
        let {onCapture,snapTextView} = this.props;
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={this.camera}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                    onGoogleVisionBarcodesDetected={({barcodes}) => {
                        console.log(barcodes)
                    }}
                />
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                    <Button
                        onPress={async () => {
                            const options = {quality: 0.5, base64: true};
                            const data = await this.camera.current.takePictureAsync(options);
                            if(onCapture) onCapture(data)
                        }}
                        style={{
                            flex: 0,
                            backgroundColor: ChungStyles.backgroundColor,
                            borderRadius: 5,
                            padding: 15,
                            paddingHorizontal: 20,
                            alignSelf: 'center',
                            margin: 20
                        }}>
                        {
                            snapTextView || <Text style={{fontSize: 14}}> SNAP </Text>
                        }
                    </Button>
                </View>
            </View>
        );
    }

    //expose to the public
    public getCameraRef(){
        return this.camera;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});
