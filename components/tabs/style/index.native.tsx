import * as RN from 'react-native';
import {Styles} from "../../style";

export default {
  Tabs: {
    container: {
      flex: 1,
    } as RN.ViewStyle,
    topTabBarSplitLine: {
      borderBottomColor: Styles.borderColor,
      borderBottomWidth: 1,
    } as RN.ViewStyle,
    bottomTabBarSplitLine: {
      borderTopColor: Styles.borderColor,
      borderTopWidth: 1,
    } as RN.ViewStyle,
  },
  TabBar: {
    container: {
    },
    tabs: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: Styles.backgroundColor,
      justifyContent: 'space-around',
      shadowRadius: 0,
      shadowOpacity: 0,
      elevation: 0,
    } as RN.ViewStyle,
    tab: {
      height: 42,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      flexDirection: 'row',
    } as RN.ViewStyle,
    underline: {
      height: 2,
      backgroundColor: Styles.brandPrimary,
    } as RN.ViewStyle,
    textStyle: {
      fontSize: 15,
    } as RN.ViewStyle,
    activeTextColor: Styles.brandPrimary,
    inactiveTextColor: Styles.textBaseColor,
  },
};
