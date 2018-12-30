import * as React from 'react'
import {StyleSheet} from 'react-native'
import Modal, {ModalProps} from "../modal/Modal";
import WhiteSpace from "../white-space/WhiteSpace";
import Flex from "../flex/Flex";
import Button from "../button/Button";
import Styles from "../styles/Styles";
import ChungText from "../chung-text/ChungText";
import ChungView from "../chung-view/ChungView";

interface ConfirmModalProps extends ModalProps{
    onConfirmClick: () => void;
    onCancelClick?:()=>void;
    hint?: string
    title?: string
}

const ConfirmModal = ({onConfirmClick, onCancelClick,hint, title,...restProps}: ConfirmModalProps) => {
    return (
        <Modal {...restProps}
               title={title || `Are you sure?`}>
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
