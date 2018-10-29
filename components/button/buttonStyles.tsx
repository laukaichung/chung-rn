import {ViewStyle} from 'react-native';
import Styles from "../style";

export default {
  container: {
    flexDirection: 'row',
  } as ViewStyle,
  defaultHighlight: {
    backgroundColor: Styles.backgroundColor,
    borderColor: Styles.borderColor,
  },
  primaryHighlight: {
    backgroundColor: Styles.brandPrimary,
    borderColor: Styles.brandPrimary,
  },
  ghostHighlight: {
    backgroundColor: 'transparent',
    borderColor: Styles.brandPrimary,
  },
  warningHighlight: {
    backgroundColor: Styles.warningButtonBackgroundColor,
    borderColor: Styles.warningButtonBorderColor,
  },
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
  primaryRaw: {
    backgroundColor: Styles.brandPrimary,
    borderColor: Styles.brandPrimary,
  },
  ghostRaw: {
    backgroundColor: 'transparent',
    borderColor: Styles.brandPrimary,
  },
  warningRaw: {
    backgroundColor: Styles.warningButtonBorderColor,
    borderColor: Styles.warningButtonBorderColor,
  },
  defaultDisabledRaw: {
    backgroundColor: Styles.fill_disabled,
    borderColor: Styles.fill_disabled,
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
    color: `${Styles.colorTextBaseInverse}4D`, // alpha 30%  https://codepen.io/chriscoyier/pen/XjbzAW
  },
  ghostHighlightText: {
    color: Styles.brandPrimary,
  },
  warningHighlightText: {
    color: `${Styles.colorTextBaseInverse}4D`, // alpha 30%  https://codepen.io/chriscoyier/pen/XjbzAW
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
    color: Styles.colorTextBaseInverse,
  },
  ghostRawText: {
    color: Styles.brandPrimary,
  },
  warningRawText: {
    color: Styles.colorTextBaseInverse,
  },
  defaultDisabledRawText: {
    color: `${Styles.textBaseColor}`, // alpha 30%  https://codepen.io/chriscoyier/pen/XjbzAW
  },
  primaryDisabledRawText: {
    color: `${Styles.colorTextBaseInverse}`, // alpha 60%  https://codepen.io/chriscoyier/pen/XjbzAW
  },
  ghostDisabledRawText: {
    color: `${Styles.textBaseColor}`, // alpha 10%  https://codepen.io/chriscoyier/pen/XjbzAW
  },
  warningDisabledRawText: {
    color: `${Styles.colorTextBaseInverse}`, // alpha 60%  https://codepen.io/chriscoyier/pen/XjbzAW
  },
  indicator: {
    marginRight: Styles.margin,
  },
};
