import {Dimensions} from "react-native";

type Orientations = "landscape"|"portrait"

export default class ScreenUtil{
    public static fullWidth(): number {
        return Dimensions.get('window').width
    }
    public static fullHeight(): number {
        return Dimensions.get('window').height
    }

    public static getOrientation():Orientations{
        const {width, height} = Dimensions.get('window');
        return width > height ? "landscape" : "portrait"
    }
}
