import * as React from 'react'
import Modal from "../modal/Modal";
import WingBlank from "../wing-blank/WingBlank";
import ChungText from "../chung-text/ChungText";
import {CustomIcon} from "../custom-icon/CustomIcon";
import Flex from "../flex/Flex";
import Styles from "../styles/Styles";
import Label from "../label/Label";
import ConfirmModal from "../confirm-modal/ConfirmModal";
import FlexItem from "../flex/FlexItem";

interface Props {
    hint?: string
    label?: string;
    onClear?: () => void,
    error?: boolean;
    onErrorClick?: () => void;
}

const iconSize = Styles.labelFontSize

const FormHeader = ({hint, error, onErrorClick, onClear, label}: Props) => {
    return (
        <Flex style={{marginBottom: Styles.margin}}>
            {
                label &&
                <FlexItem flex={4}>
                    <Label>
                        {label}
                    </Label>
                </FlexItem>
            }
            {
                hint && (
                    <Modal
                        buttonTrigger={(
                            <FlexItem>
                                <CustomIcon customSize={iconSize} name={"info-circle"}/>
                            </FlexItem>
                        )}>
                        {
                            () => (
                                <WingBlank marginVertical>
                                    <ChungText>{hint}</ChungText>
                                </WingBlank>
                            )
                        }
                    </Modal>
                )
            }
            {
                error && (
                    <FlexItem onPress={onErrorClick}>
                        <CustomIcon color={"red"} customSize={iconSize} name={"exclamation-circle"}/>
                    </FlexItem>
                )
            }

            {
                onClear &&
                <ConfirmModal
                    buttonTrigger={(
                        <FlexItem>
                            <CustomIcon customSize={iconSize} name={"eraser"}/>
                        </FlexItem>
                    )}
                    title={`Are you sure you want to clear the content?`}
                    onConfirmClick={onClear}/>
            }

        </Flex>
    )
};

export default FormHeader;
