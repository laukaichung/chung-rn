import * as React from 'react'
import {useEffect, useRef, useState} from 'react'
import CameraRollList from "../../CameraRollImageList";
import {View} from "react-native";
import Button from "../../Button";
import {CameraRollFile} from "../../type";
import PermissionUtil from "../../util/PermissionUtil";
import {useNavigation} from "react-navigation-hooks";

interface Props {
    onConfirm: (files: CameraRollFile[]) => void
}

const CameraRollImageList = ({}: Props) => {
    const ref = useRef<CameraRollList>();
    const [permissionRequested, setPermissionRequested] = useState();
    const {goBack, state} = useNavigation<{params: Props}>();
    useEffect(() => {
        PermissionUtil.androidReadExteralStorage().then(res => {
            if (!res.error) setPermissionRequested(res.granted)
        })
    });
    if (!permissionRequested) {
        return null;
    }

    return (
        <View style={{flex: 1}}>
            <View>
                <Button onPress={() => state.params.onConfirm(this.ref.current._getSelectedImages())}>
                    Confirm
                </Button>
                <Button onPress={goBack}>Cancel</Button>
            </View>
            <CameraRollList ref={ref}/>
        </View>
    )
};

export default CameraRollImageList

