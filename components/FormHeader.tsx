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
import VerticalMiddleContainer from "./VerticalMiddleContainer";
import {TestProps} from "./type";

export interface FormHeaderProps extends TestProps {
    hint?: string
    label: string;
    onClear?: () => void,
    error?: boolean;
    onErrorClick?: () => void;
}

const iconSize = Styles.labelFontSize;

const FormHeader = ({hint, error, onErrorClick, testID, onClear, label}: FormHeaderProps) => {
    return (
        <Flex testID={testID} style={{marginBottom: Styles.margin}}>
            {
                label &&
                <FlexItem flex={2}>
                    <VerticalMiddleContainer>
                        <Label>
                            {label}
                        </Label>
                        {
                            hint && (
                                <Modal
                                    nonButtonTrigger={(
                                        <WingBlank>
                                            <Icon customSize={iconSize} name={"info-circle"}/>
                                        </WingBlank>
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
                    </VerticalMiddleContainer>

                </FlexItem>
            }
            <FlexItem
                style={[
                    {
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    }
                ]}
                flex={1}
            >
                {
                    error && (
                        <WingBlank>
                            <Icon color={"red"}
                                  onPress={onErrorClick}
                                  customSize={iconSize}
                                  name={"exclamation-circle"}
                            />
                        </WingBlank>
                    )
                }
                {
                    onClear &&
                    <ConfirmModal
                        buttonTrigger={(
                            <Icon
                                customSize={iconSize}
                                style={{marginLeft: 10}}
                                name={"eraser"}
                            />
                        )}
                        title={`Are you sure you want to clear the content?`}
                        onConfirm={onClear}
                    />
                }
            </FlexItem>

        </Flex>
    )
};

export default FormHeader;
