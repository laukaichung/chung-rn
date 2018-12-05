import * as React from 'react'
import {StyleSheet} from 'react-native'
import Modal, {ModalProps} from "../modal";
import WhiteSpace from "../white-space";
import Flex from "../flex/Flex";
import Button from "../button";
import Styles from "../style";
import ChungText from "../chung-text";
import ChungView from "../chung-view";

interface ConfirmModalProps extends ModalProps{
    onConfirmClick: () => void;
    onCancelClick?:()=>void;
    hint?: string
    confirmTitle?: string
}

const ConfirmModal = ({onConfirmClick, onCancelClick,hint, confirmTitle,...restProps}: ConfirmModalProps) => {
    return (
        <Modal {...restProps}

               title={confirmTitle || `Are you sure?`}>
            {
                ({closeModal}) =>
                    <ChungView>
                        {hint && (
                            <WhiteSpace>
                                <ChungText>{hint}</ChungText>
                            </WhiteSpace>
                        )}
                        <Flex style={styles.footerContainer}>
                            <Flex.Item style={styles.cancelButton}>
                                <Button
                                    onPress={() => {
                                        if(onCancelClick) onCancelClick();
                                        closeModal();
                                    }}>
                                    Cancel
                                </Button>
                            </Flex.Item>
                            <Flex.Item>
                                <Button
                                    onPress={() => {
                                        onConfirmClick();
                                        closeModal();
                                    }}>
                                    Confirm
                                </Button>
                            </Flex.Item>
                        </Flex>
                    </ChungView>
            }
        </Modal>
    )
};

const styles = StyleSheet.create({
    cancelButton: {
        marginRight: 5
    },
    footerContainer:{
        paddingVertical:Styles.paddingLg
    }

});

export default ConfirmModal;
