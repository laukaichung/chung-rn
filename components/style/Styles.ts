
export class Styles {
    static get primaryColor() {
        return '#108ee9'
    }

    static get primaryColorDark() {
        return '#0f6db8'
    }

    static get selectedColor() {
        return '#dadada'
    }

    static iconButtonSize = 16;

    static colorIconBase = '#cccccc';

    static textBaseColor = '#222';

    static marginXs = 3
    static marginLg = 15;
    static margin = 10;
    static marginSm = 5;
    static marginXl = 21;

    static fontSizeBase = 14;
    static fontSizeSubhead =  15
    static fontSizeCaption = 16
    static fontSizeHeading = 17

    static paddingSm = 5;
    static padding = 10;
    static paddingLg= 15;
    static paddingXl= 21;

    static header = 20;
    static subHeader = 15;
    static fillTap = '#dddddd';

    static fill_disabled: '#dddddd'


    static colorTextCaption = '#888888';
    static colorTextBaseInverse: '#fff';
    static iconSizeXxs = 15;
    static icon_size_lg = 36

    static fontSizeCaptionSm: 12;

    static modelZIndex: 999;

    static brandPrimary:'#108ee9';

    static listItemHeight:44;
    static inputFontColor:'#686868';
    static inputFontSize:17;

    static radiusSm:3;
    static radiusMd:5;
    static radiusLg:7;

    static toastZindex: 1999;

    static toastFill: 'rgba(0, 0, 0, .8)';

    static borderWidth = 1;

    static backgroundColor = '#fff';


    static button_height: 47
    static button_font_size: 18

    static button_height_sm: 23
    static button_font_size_sm: 12

    static get primary_button_fill(){return this.brandPrimary}
    static primary_button_fill_tap: '#0e80d2';

    static get ghost_button_color(){ return this.brandPrimary}
    static get ghost_button_fill_tap(){ return `${this.brandPrimary}99`}

    static warning_button_fill: '#e94f4f';
    static warning_button_fill_tap: '#d24747';

    static get borderColor() {
        return '#eee'
    }

    static get iconSize() {
        return 32
    }

    static iconSizeSm = 16;

    static get iconButtonStyle() {
        return {
            width: this.iconButtonSize,
            height: this.iconButtonSize,
            tintColor: this.primaryColorDark
        }
    }

}
