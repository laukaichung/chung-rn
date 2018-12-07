import {ViewStyle} from 'react-native';
import Styles from "../style";

export default {
  wrapperStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Styles.radiusMd,
    borderWidth: 1,
  },
  largeRaw: {
    height: Styles.buttonHeight,
    paddingLeft: Styles.paddingLg,
    paddingRight: Styles.paddingLg,
  },
  smallRaw: {
    height: Styles.buttonHeightSm,
    paddingLeft: Styles.paddingSm,
    paddingRight: Styles.paddingSm,
  },
  defaultRaw: {
    backgroundColor: Styles.backgroundColor,
    borderColor: Styles.borderColor,
  },
  defaultDisabledRaw: {
    backgroundColor: Styles.disabledBackgroundColor,
    borderColor: Styles.disabledBorderColor,
  },
  primaryDisabledRaw: {
    opacity: 0.4,
  },
  ghostDisabledRaw: {
    borderColor: `${Styles.textBaseColor}1A`, // alpha 10%  https://codepen.io/chriscoyier/pen/XjbzAW
  },
  warningDisabledRaw: {
    opacity: 0.4,
  },
  defaultHighlightText: {
    color: Styles.textBaseColor,
  },
  primaryHighlightText: {
    color: `${Styles.whiteTextColor}4D`, // alpha 30%  https://codepen.io/chriscoyier/pen/XjbzAW
  },
  ghostHighlightText: {
    color: Styles.brandPrimary,
  },
  warningHighlightText: {
    color: `${Styles.whiteTextColor}4D`, // alpha 30%  https://codepen.io/chriscoyier/pen/XjbzAW
  },
  largeRawText: {
    fontSize: Styles.buttonFontSize,
  },
  smallRawText: {
    fontSize: Styles.buttonFontSizeSm,
  },
  defaultRawText: {
    color: Styles.textBaseColor,
  },
  primaryRawText: {
    color: Styles.whiteTextColor,
  },
  ghostRawText: {
    color: Styles.brandPrimary,
  },
  warningRawText: {
    color: Styles.whiteTextColor,
  },
  defaultDisabledRawText: {
    color: Styles.disabledTextColor, // alpha 30%  https://codepen.io/chriscoyier/pen/XjbzAW
  },
  primaryDisabledRawText: {
    color: Styles.whiteTextColor, // alpha 60%  https://codepen.io/chriscoyier/pen/XjbzAW
  },
  ghostDisabledRawText: {
    color: Styles.textBaseColor, // alpha 10%  https://codepen.io/chriscoyier/pen/XjbzAW
  },
  warningDisabledRawText: {
    color: Styles.whiteTextColor, // alpha 60%  https://codepen.io/chriscoyier/pen/XjbzAW
  },
  indicator: {
    marginRight: Styles.margin,
  },
};
