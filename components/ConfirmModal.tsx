import * as React from 'react'
import Modal, {ModalContainer, ModalProps} from "./Modal";
import WhiteSpace from "./WhiteSpace";
import Flex from "./Flex";
import Button from "./Button";
import ChungText from "./ChungText";
import FlexItem from "./FlexItem";
import WingBlank from "./WingBlank";
import Header from "./Header";
import Portal from "./portal/Portal";
import {Omit} from "./type";

export interface ConfirmModalProps extends ModalProps {
    onConfirm: () => void;
    onCancel?: () => void;
    onConfirmMessage?: string
    title?: string
}

class ConfirmModal extends React.Component<ConfirmModalProps> {

    static add = addModal;

    render() {
        const {props} = this;
        return (
            <Modal {...props}>
                {
                    ({closeModal}) =>
                        <ConfirmModalContainer
                            {...props}
                            onClose={closeModal}
                        />
                }
            </Modal>
        )
    }
}

interface ConfirmModalContainerProps extends ConfirmModalProps {
    onClose: () => void;
}

class ConfirmModalContainer extends React.Component<ConfirmModalContainerProps> {
    render() {
        const {onConfirm, onCancel, onConfirmMessage, title, onClose} = this.props;
        return (
            <WingBlank style={{justifyContent: "center", padding: 20}} size="lg">
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
                <WhiteSpace>
                    <Flex>
                        <FlexItem>
                            <Button
                                style={{marginRight: 5}}
                                onPress={() => {
                                    onClose();
                                    if (onCancel) onCancel();
                                }}
                            >
                                Cancel
                            </Button>
                        </FlexItem>
                        <FlexItem>
                            <Button
                                onPress={() => {
                                    onClose();
                                    onConfirm();
                                }}
                            >
                                Confirm
                            </Button>
                        </FlexItem>
                    </Flex>
                </WhiteSpace>
            </WingBlank>
        )
    }
}

function addModal(props: Omit<ConfirmModalContainerProps, "onClose">) {

    const key = Portal.add((
        <ModalContainer
            {...props}
            onClose={() => Portal.remove(key)}
            children={() => (
                <ConfirmModalContainer
                    {...props}
                    onClose={() => {
                        Portal.remove(key);
                    }}
                />
            )}
        />
    ))


}

//
// const styles = StyleSheet.create({
//     cancelButton: {
//         marginRight: 5
//     },
//     footerContainer: {
//         paddingVertical: Styles.paddingLg
//     }
//
// });

export default ConfirmModal;
