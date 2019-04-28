import * as React from "react"
import Modal from "./Modal";
import {ReactNode} from "react";
import {ListItem} from "./index";
import ChungText from "./ChungText";
import List from "./List";
import Styles from "./Styles";
import {ListItemProps} from "./ListItem";
import {TestProps} from "./type";

export interface MenuModalItem extends TestProps{
    text: string;
    onPress: () => void;
    modalRemainsOpenOnPress?: boolean;
    listItemProps?: ListItemProps;
}


interface MenuModalProps {
    menus: MenuModalItem[]
    buttonTrigger: ReactNode
    title?: string;
    modalListTestID?: string

}

const MenuModal = ({menus, buttonTrigger, modalListTestID, title}: MenuModalProps) => {
    return (
        <Modal buttonTrigger={buttonTrigger}>
            {
                ({closeModal}) => {
                    return (
                        <List testID={modalListTestID} headerText={title}>
                            {
                                menus.map((o) => {
                                        const {text, testID, listItemProps, modalRemainsOpenOnPress, onPress} = o
                                        return (
                                            <ListItem
                                                testID={testID}
                                                key={text}
                                                onPress={async () => {
                                                    await onPress();
                                                    if (!modalRemainsOpenOnPress) {
                                                        closeModal();
                                                    }
                                                }}
                                                border
                                                {...listItemProps}
                                            >
                                                <ChungText
                                                    style={{
                                                        fontSize: Styles.headerFontSize,
                                                        textAlign: "center"
                                                    }}
                                                >
                                                    {text}
                                                </ChungText>
                                            </ListItem>
                                        )
                                    }
                                )
                            }
                        </List>
                    )
                }
            }
        </Modal>
    )
};

export default MenuModal;