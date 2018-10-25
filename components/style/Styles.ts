
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

    static marginLg = 15;
    static margin = 10;
    static marginSm = 5;
    static paddingSm = 5;
    static padding = 10;
    static paddingLg= 15;
    static header = 20;
    static subHeader = 15;
    static fillTap = '#dddddd';
    static colorTextCaption = '#888888';
    static colorTextBaseInverse: '#fff';

    static fontSizeCaptionSm: 12

    static brandPrimary:'#108ee9'

    static listItemHeight:44;
    static inputFontColor:'#686868';
    static inputFontSize:17;

    static radiusSm:3;

    static borderWidth = 1;

    static backgroundColor = '#fff';
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
