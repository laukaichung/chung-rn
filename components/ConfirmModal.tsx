import * as React from 'react'
import {StyleSheet} from 'react-native'
import Modal, {ModalProps} from "./Modal";
import WhiteSpace from "./WhiteSpace";
import Flex from "./Flex";
import Button from "./Button";
import Styles from "./Styles";
import ChungText from "./ChungText";
import FlexItem from "./FlexItem";
import WingBlank from "./WingBlank";
import Header from "./Header";

export interface ConfirmModalProps extends ModalProps {
    onConfirm: () => void;
    onCancel?: () => void;
    onConfirmMessage?: string
    title?: string
}

const ConfirmModal = ({onConfirm, onCancel, onConfirmMessage, title, ...restProps}: ConfirmModalProps) => {
    return (
        <Modal
            {...restProps}
        >
            {
                ({closeModal}) =>
                    <WingBlank
                        style={{
                            flex: 1, flexDirection: "column", justifyContent: "center"
                        }}
                    >
                        <Header>
                            {title || `Are you sure?`}
                        </Header>
                        {
                            onConfirmMessage && (
                                <WhiteSpace>
                                    <ChungText>{onConfirmMessage}</ChungText>
                                </WhiteSpace>
                            )
                        }
                        <Flex style={styles.footerContainer}>
                            <FlexItem style={styles.cancelButton}>
                                <Button
                                    onPress={() => {
                                        closeModal();
                                        if (onCancel) onCancel();
                                    }}
                                >
                                    Cancel
                                </Button>
                            </FlexItem>
                            <FlexItem>
                                <Button
                                    onPress={() => {
                                        // todo test if close modal before submitting request could prevent memory leak:
                                        // setState on unmounted Component
                                        closeModal();
                                        onConfirm();
                                    }}>
                                    Confirm
                                </Button>
                            </FlexItem>
                        </Flex>
                    </WingBlank>
            }
        </Modal>
    )
};

const styles = StyleSheet.create({
    cancelButton: {
        marginRight: 5
    },
    footerContainer: {
        paddingVertical: Styles.paddingLg
    }

});

export default ConfirmModal;
