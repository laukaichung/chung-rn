import {TextStyle, ViewStyle} from "react-native";

export type ChungThemeTypes = "dark"|"light"


export default class Styles {

    static mode:ChungThemeTypes;

    static get isDarkMode(){
        return this.mode === "dark";
    }

    static get placeholderTextColor(){
        return "#a3a3a3"
    }

    static get inputAreaBackgroundColor(){
        return this.isDarkMode? "#000000":"#ffffff"
    }

    static primaryColorDark = '#0f62a8';

    static primaryColorLight = '#108ee9';

    static get primaryColor() {
        return this.isDarkMode?this.primaryColorDark:this.primaryColorLight
    }

    static brandImportant = '#d85105';

    static iconSizeSm = 16;
    static iconSizeMd = 32;
    static iconSizeLg = 48;
    static iconSizeXL = 60;

    static iconColorBase = '#cccccc';

    static get hintTextDefaultTextColor(){
        return this.primaryColor
    }

    static textBaseColor = '#222222';

    static get listHeaderContainerStyle():ViewStyle{
        return {
            padding:Styles.padding,
            backgroundColor: this.isDarkMode?'#343c40':'#c6d2e2'
        }
    }

    static get accordionHeaderContainerStyle():ViewStyle{
        return {
            backgroundColor:this.isDarkMode?'#343c40':'#c6d2e2',
            borderBottomColor:this.isDarkMode?"#8ba1ab":"#b7c2d2",
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            borderBottomWidth: 1,
        }
    }

    static get accordionHeaderTextColor():TextStyle{
        return {
            fontWeight: "bold",
            fontSize: 20,
            color: this.isDarkMode?"#b7c0c0":"#75779e"
        }
    }

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

    static backgroundColorSelected = '#cdcdcd';

    static get backgroundColor(){
        return this.isDarkMode ? '#1d1d1d': '#ffffff'
    };

    static get textColor(){
        return this.isDarkMode ? '#ccc6c0':'#6d6d6d'
    };

    static get headerColor(){
        return this.isDarkMode? "#d85105":this.primaryColorDark
    };
    static InverseTextColor= '#ffffff';

    static disabledBackgroundColor = '#eaeaea';

    static disabledBorderColor = '#dadada';

    static get disabledTextColor(){
        return this.isDarkMode?'#979797':'#cbcbcb'
    };

    static fontSizeCaptionSm= 12;

    static brandPrimary='#108ee9';

    static listItemHeight=44;

    static inputFontColor='#686868';
    static inputFontSize=17;

    static radiusSm = 3;
    static radiusMd = 5;
    static radiusLg = 7;

    static toastZIndex= 1999;

    static get modalBackgroundColor(){
        return this.isDarkMode?this.modalBackgroundColorDark:this.backgroundColor
    }

    static modalBackgroundColorDark= '#07233f';

    static borderWidth = 1;

    static buttonHeight= 47;
    static buttonFontSize= 18;
    static buttonHeightSm= 23;
    static buttonFontSizeSm= 12;

    static warningButtonBorderColor= '#e94f4f';

    static get borderColor() {
        return this.isDarkMode?'#444444':'#d6d6d6'
    }

    static get iconButtonStyle() {
        return {
            width: this.iconSizeSm,
            height: this.iconSizeSm,
            tintColor: this.primaryColor
        }
    }

    static centerItems = {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    } as ViewStyle

}
