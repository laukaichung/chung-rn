import {Platform, TextStyle, ViewStyle} from "react-native";

export type ChungThemeTypes = "dark"|"light"

export default class Styles {

    static mode:ChungThemeTypes;

    static get isDarkMode(){
        return this.mode === "dark";
    }

    static lineHeight = 28;

    static fontFamilyAndroid = "sans-serif-condensed";

    static fontFamilyIOS = "AmericanTypewriter-Condensed";

    static get fontFamily(){
        return Platform.OS === "ios" ? this.fontFamilyIOS:this.fontFamilyAndroid;
    }

    static get placeholderTextColor(){
        return this.isDarkMode?"#747474":"#a3a3a3"
    }

    static darkestColor = "#000000";

    static lightestColor = "#ffffff";

    static get extremeBackgroundColor(){
        return this.isDarkMode? this.darkestColor:this.lightestColor
    }

    static primaryColorDark = '#003978';
    static primaryColorLight = '#568fda';
    static primaryColor = "#0f62a8";

    static secondaryColor = "#366b1d";


    static badgeBackgroundColor = "#cb6600";

    static get warningColor(){
        return this.isDarkMode?"#eea21b":"#ffcc00"
    }

    static errorColorLight = "#cc3300";
    static errorColorDark = "#ea4732";

    static get errorColor(){
        return this.isDarkMode?this.errorColorLight:this.errorColorDark;
    }

    static iconSizeSm = 16;
    static iconSizeMd = 32;
    static iconSizeLg = 48;
    static iconSizeXL = 60;

    static indicatorColor = '#BDBDBD';

    static get hintTextDefaultTextColor(){
        return this.isDarkMode ? this.primaryColorLight: this.primaryColor
    }

    static get listHeaderContainerStyle():ViewStyle{
        return {
            padding:Styles.padding,
            backgroundColor: this.isDarkMode?this.primaryColorDark:this.primaryColorLight
        }
    }

    static get listHeaderTextColor(){
        return this.whiteTextColor
    }

    static accordionHeaderBackgroundColorDark = "#001c38";

    static accordionHeaderBackgroundColorLight = "#474747";

    static get accordionHeaderStyle():ViewStyle{
        return {
            backgroundColor:this.isDarkMode?this.accordionHeaderBackgroundColorDark:this.accordionHeaderBackgroundColorLight,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            //borderBottomWidth: 1,
            //borderBottomColor:this.borderColor,

        }
    }

    static get accordionHeaderTextColor():TextStyle{
        return {
            fontWeight: "bold",
            fontSize: 20,
            color: this.whiteTextColor
        }
    }

    static marginXs = 3;
    static marginLg = 15;
    static margin = 10;
    static marginSm = 5;

    static fontSize = 14;
    static headerFontSize = 19;
    static labelFontSize = 18;

    static paddingSm = 5;
    static padding = 10;
    static paddingLg= 15;
    static paddingXl= 21;

    static get selectedTextColor(){
        return this.secondaryColor;
    }

    static get selectedBackgroundColor(){
        return this.isDarkMode? this.primaryColorDark:this.primaryColor
    }

    ////////Use in App /////////

    static iconColorDark = "#c6c6c6";
    static iconColorLight = "#5e5e5e";

    static get iconColor(){
        return this.isDarkMode ? this.iconColorDark:this.iconColorLight;
    }

    static get statusBarBackgroundColor(){
        return this.darkestColor;
    }
    ////////////////////////////

    static get backgroundColor(){
        return this.isDarkMode ? '#1d1d1d': '#ffffff'
    };

    static get textColor(){
        return this.isDarkMode ? '#ccc6c0':'#6d6d6d'
    };

    static get headerColor(){
        return this.primaryColor
    };
    static whiteTextColor= '#ffffff';

    static disabledBackgroundColorDark = "#868686";
    static disabledBackgroundColorLight = "#bcbcbc";

    static get disabledBackgroundColor() {
        return this.isDarkMode?this.disabledBackgroundColorDark:this.disabledBackgroundColorLight
    };

    static get disabledTextColor(){
        return this.isDarkMode?"#6c6c6c":"#9a9a9a"
    };

    static disabledBorderColor = '#dadada';

    static fontSizeCaptionSm= 12;

    static brandPrimary='#108ee9';

    static listItemHeight=44;

    static inputSingleRowHeight = 44;

    static inputFontColor='#686868';
    static inputFontSize=17;

    static radiusSm = 3;
    static radiusMd = 5;
    static radiusLg = 7;

    static toastZIndex= 1999;

    static get modalBackgroundColor(){
        return this.isDarkMode?this.modalBackgroundColorDark:this.backgroundColor
    }

    static get accordionIconColor(){
        return this.isDarkMode?this.primaryColor:this.primaryColorLight
    }

    static modalBackgroundColorDark= '#07233f';

    static borderWidth = 1;

    static buttonFontSize= 12;
    static buttonFontSizeLg= 18;
    static defaultButtonPressInTextColor = '#222222';

    static primaryButtonTextColorLight = "#ffffff";

    static primaryButtonTextColorDark = "#BDBDBD";

    static get primaryButtonTextColor(){
        return this.isDarkMode? this.primaryButtonTextColorDark:this.primaryButtonTextColorLight
    }

    static get primaryButtonBackgroundColor(){
        return this.isDarkMode? this.primaryColorDark:this.primaryColor
    }

    static borderColorDark = "#444444";
    static borderColorLight = "#d0d0d0";

    static get borderColor() {
        return this.isDarkMode? this.borderColorDark:this.borderColorLight
    }

    static get iconButtonStyle() {
        return {
            width: this.iconSizeSm,
            height: this.iconSizeSm,
            tintColor: this.isDarkMode?this.primaryColor:this.primaryColorLight
        }
    }

    static centerItems = {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    } as ViewStyle;

    static inline:ViewStyle = {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }

    static swipeableContainer = {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    } as ViewStyle

    static textBaseStyle = {
        fontFamily: Styles.fontFamily,
        color:Styles.textColor,
        lineHeight: Styles.lineHeight
    } as TextStyle
}
