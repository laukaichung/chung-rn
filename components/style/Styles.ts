import {StyleProp, ViewStyle} from "react-native";

export class Styles {

    static get primaryColorDark() {
        return '#0f6db8'
    }

    static selectedColor = '#dadada';

    static brandImportant = '#ff5b05';


    static iconButtonSize = 16;

    static colorIconBase = '#cccccc';

    static textBaseColor = '#222222';

    static marginXs = 3
    static marginLg = 15;
    static margin = 10;
    static marginSm = 5;

    static fontSizeBase = 14;
    static fontSizeSubhead =  15
    static fontSizeCaption = 16
    static fontSizeHeading = 17

    static paddingSm = 5;
    static padding = 10;
    static paddingLg= 15;
    static paddingXl= 21;

    static subHeader = 15;
    static fillTap = '#dddddd';

    static fill_disabled= '#dddddd';


    static colorTextCaption = '#b6b6b6';
    static colorTextHeading = '#7a6b7a'
    static colorTextBaseInverse= '#ffffff';

    static iconSizeSm = 16;
    static iconSizeXxs = 15;
    static iconSizeLg = 36;

    static fontSizeCaptionSm= 12;

    static modelZIndex= 999;

    static brandPrimary='#108ee9';

    static listItemHeight=44;

    static inputFontColor='#686868';
    static inputFontSize=17;

    static radiusSm = 3;
    static radiusMd = 5;
    static radiusLg = 7;

    static toastZindex= 1999;

    static toastFill= 'rgba(0, 0, 0, .8)';

    static borderWidth = 1;

    static backgroundColor = '#ffffff';


    static buttonHeight= 47
    static buttonFontSize= 18

    static buttonHeightSm= 23
    static buttonFontSizeSm= 12

    static warningButtonBorderColor= '#e94f4f';
    static warningButtonBackgroundColor= '#d24747';

    static get borderColor() {
        return '#bec5cc'
    }

    static get iconSize() {
        return 32
    }


    static get iconButtonStyle() {
        return {
            width: this.iconButtonSize,
            height: this.iconButtonSize,
            tintColor: this.primaryColorDark
        }
    }

    static get getCenterStyles():StyleProp<ViewStyle>{
        return {
            flex: 1,
            justifyContent: 'center',
            alignItems:'center'
        }
    }

}
