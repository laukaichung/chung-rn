import * as React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import Styles from "../style";

export interface WingBlankProps {
    style?: StyleProp<ViewStyle>;
    size?: 'sm' | 'md' | 'lg';
    marginVertical?:boolean;
}

class WingBlank extends React.Component<WingBlankProps, any> {

    public render() {
        const {size = "md", style, children} = this.props;
        let margin = Styles.margin;
        if (size === "sm") {
            margin = Styles.marginSm
        } else if (size === "lg") {
            margin = Styles.marginLg;
        }
        return (
            <View style={[{margin}, style]}>
                {children}
            </View>
        );
    }
}

export default WingBlank;
