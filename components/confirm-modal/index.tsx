import * as React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import CustomModal, {CustomModalProps} from "../modal";
import WhiteSpace from "../white-space";
import Flex from "../flex/Flex";
import Button from "../button";
import {Styles} from "../style/Styles";

interface ConfirmModalProps extends CustomModalProps{
    onConfirmClick: () => void;
    onCancelClick?:()=>void;
    hint?: string
    confirmTitle?: string
}

const ConfirmModal = ({onConfirmClick, onCancelClick,hint, confirmTitle,...restProps}: ConfirmModalProps) => {
    return (
        <CustomModal {...restProps} title={confirmTitle || `Are you sure?`}>
            {
                ({closeModal}) =>
                    <View>
                        {hint && <WhiteSpace><Text>{hint}</Text></WhiteSpace>}
                        <Flex style={styles.footerContainer}>
                            <Flex.Item style={styles.confirmButton}>
                                <Button
                                    onClick={() => {
                                        onConfirmClick();
                                        closeModal();
                                    }}>
                                    Confirm
                                </Button>
                            </Flex.Item>
                            <Flex.Item style={styles.cancelButton}>
                                <Button
                                    onClick={() => {
                                        if(onCancelClick) onCancelClick()
                                        closeModal();
                                    }}>
                                    Cancel
                                </Button>
                            </Flex.Item>
                        </Flex>
                    </View>
            }
        </CustomModal>
    )
};

const styles = StyleSheet.create({
    cancelButton: {
        marginLeft: 5
    },
    confirmButton: {
        marginRight: 5
    },
    footerContainer:{
        paddingVertical:Styles.paddingLg
    }

});

export default ConfirmModal;
