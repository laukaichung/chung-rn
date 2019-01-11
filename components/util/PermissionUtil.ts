import {PermissionsAndroid, Platform} from "react-native";

export class PermissionUtil {

    static async androidReadExteralStorage():Promise<{granted:boolean,error?:Error}> {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        'title': 'Permission To Load Photos From External Storage',
                        'message': 'Permissions have to be granted in order to list photos on your phones for you to choose.'
                    }
                );

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    return {granted:true}

                } else {

                    return {granted:false};
                }

            } catch (err) {
                return {granted:false,error:err};
            }
        }
    }

}
