import {ViewStyle} from "react-native";

export default class Styles {

    static get primaryColorDark() {
        return '#0f6db8'
    }

    static brandImportant = '#ff5b05';

    static iconSizeSm = 16;
    static iconSizeMd = 32;
    static iconSizeLg = 48;
    static iconSizeXL = 60;

    static iconColorBase = '#cccccc';

    static textBaseColor = '#222222';

    static marginXs = 3;
    static marginLg = 15;
    static margin = 10;
    static marginSm = 5;

    static fontSize = 14;
    static subheaderFontSize =  15;
    static captionFontSize = 16;
    static HeaderFontSize = 17;

    static paddingSm = 5;
    static padding = 10;
    static paddingLg= 15;
    static paddingXl= 21;

    static backgroundColorSelected = '#dadada';

    static textColor = '#b6b6b6';
    static headerColor = '#7a6b7a';
    static InverseTextColor= '#ffffff';
    static disabledBackgroundColor = '#dddddd';
    static disabledBorderColor = '#dadada';
    static disabledTextColor = '#bbbbbb';

    static fontSizeCaptionSm= 12;

    static brandPrimary='#108ee9';

    static listItemHeight=44;

    static inputFontColor='#686868';
    static inputFontSize=17;

    static radiusSm = 3;
    static radiusMd = 5;
    static radiusLg = 7;

    static toastZIndex= 1999;

    static toastFill= 'rgba(0, 0, 0, .8)';

    static borderWidth = 1;

    static backgroundColor = '#ffffff';

    static buttonHeight= 47;
    static buttonFontSize= 18;
    static buttonHeightSm= 23;
    static buttonFontSizeSm= 12;

    static warningButtonBorderColor= '#e94f4f';
    static warningButtonBackgroundColor= '#d24747';

    static get borderColor() {
        return '#bec5cc'
    }

    static get iconButtonStyle() {
        return {
            width: this.iconSizeSm,
            height: this.iconSizeSm,
            tintColor: this.primaryColorDark
        }
    }

    static centerItems = {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    } as ViewStyle

}
