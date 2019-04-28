import * as React from 'react'
import {StyleSheet, View} from 'react-native'
import Icon from "./Icon";
import ChungText from "./ChungText";
import {TestProps} from "./type";


interface Props extends TestProps{
    invalidMessage:string
}

const FormInvalidHint = ({testID, invalidMessage}: Props) => {
    if (invalidMessage) {
        return (
            <View testID={testID}>
                <Icon size={"sm"} color={`red`} name={`arrow-circle-up`}>
                    {' '}<ChungText style={styles.warning}>{invalidMessage}</ChungText>
                </Icon>
            </View>
        )
    } else {
        return null;
    }
};

const styles = StyleSheet.create({
    warning: {
        textDecorationLine: 'underline',
    }
});

export default FormInvalidHint;
