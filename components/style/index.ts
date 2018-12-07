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

    static get darkestBackgroundColor(){
        return this.isDarkMode? "#000000":"#ffffff"
    }

    static primaryColorDark = '#003978';
    static primaryColorLight = '#568fda';
    static primaryColor = "#0f62a8";


    static badgeBackgroundColor = "#f57c00";

    static get warningColor(){
        return this.isDarkMode?"#eea21b":"#ffcc00"
    }

    static get errorColor(){
        return this.isDarkMode?"#cc3300":"#ea4732"
    }

    static iconSizeSm = 16;
    static iconSizeMd = 32;
    static iconSizeLg = 48;
    static iconSizeXL = 60;

    static indicatorColor = '#BDBDBD';

    static get hintTextDefaultTextColor(){
        return this.primaryColor
    }

    static textBaseColor = '#222222';

    static get listHeaderContainerStyle():ViewStyle{
        return {
            padding:Styles.padding,
            backgroundColor: this.isDarkMode?this.primaryColorDark:'#c6d2e2'
        }
    }

    static get accordionHeaderContainerStyle():ViewStyle{
        return {
            backgroundColor:this.isDarkMode?this.primaryColorDark:this.primaryColor,
            borderBottomColor:this.borderColor,
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
            color: this.isDarkMode?this.textColor:this.whiteTextColor
        }
    }

    static marginXs = 3;
    static marginLg = 15;
    static margin = 10;
    static marginSm = 5;

    static fontSize = 14;
    static subheaderFontSize =  15;
    static headerFontSize = 19;

    static paddingSm = 5;
    static padding = 10;
    static paddingLg= 15;
    static paddingXl= 21;

    static get selectedBackgroundColor(){
        return this.isDarkMode? this.primaryColorDark:this.primaryColor
    }

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

    static get disabledBackgroundColor() {
        return this.isDarkMode?"#868686":"#bcbcbc"
    };

    static get disabledTextColor(){
        return this.isDarkMode?"#6c6c6c":"grey"
    };

    static disabledBorderColor = '#dadada';

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
    } as ViewStyle

}
