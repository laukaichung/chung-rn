import { Platform, ViewStyle, ImageStyle, TextStyle } from 'react-native';
import {Styles} from "../../styles/Styles";

export interface IToastStyle {
  container: ViewStyle;
  innerContainer: ViewStyle;
  innerWrap: ViewStyle;
  iconToast: ViewStyle;
  textToast: ViewStyle;
  content: TextStyle;
  image: ImageStyle;
  centering: ViewStyle;
}

