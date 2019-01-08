import * as React from 'react'
import {StyleSheet, View} from 'react-native'
import Modal, {ModalProps} from "./Modal";
import WhiteSpace from "./WhiteSpace";
import Flex from "./Flex";
import Button from "./Button";
import Styles from "./Styles";
import ChungText from "./ChungText";
import FlexItem from "./FlexItem";

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
                    <View>
                        {hint && (
                            <WhiteSpace>
                                <ChungText>{hint}</ChungText>
                            </WhiteSpace>
                        )}
                        <Flex style={styles.footerContainer}>
                            <FlexItem style={styles.cancelButton}>
                                <Button
                                    onPress={() => {
                                        if(onCancelClick) onCancelClick();
                                        closeModal();
                                    }}>
                                    Cancel
                                </Button>
                            </FlexItem>
                            <FlexItem>
                                <Button
                                    onPress={() => {
                                        onConfirmClick();
                                        closeModal();
                                    }}>
                                    Confirm
                                </Button>
                            </FlexItem>
                        </Flex>
                    </View>
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
