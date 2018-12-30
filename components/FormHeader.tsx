import * as React from 'react'
import Modal from "./Modal";
import WingBlank from "./WingBlank";
import ChungText from "./ChungText";
import Flex from "./Flex";
import Styles from "./Styles";
import Label from "./Label";
import ConfirmModal from "./ConfirmModal";
import FlexItem from "./FlexItem";
import Icon from "./Icon";

interface Props {
    hint?: string
    label?: string;
    onClear?: () => void,
    error?: boolean;
    onErrorClick?: () => void;
}

const iconSize = Styles.labelFontSize;

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
                                <Icon customSize={iconSize} name={"info-circle"}/>
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
                        <Icon color={"red"} customSize={iconSize} name={"exclamation-circle"}/>
                    </FlexItem>
                )
            }

            {
                onClear &&
                <ConfirmModal
                    buttonTrigger={(
                        <FlexItem>
                            <Icon customSize={iconSize} name={"eraser"}/>
                        </FlexItem>
                    )}
                    title={`Are you sure you want to clear the content?`}
                    onConfirmClick={onClear}/>
            }

        </Flex>
    )
};

export default FormHeader;
