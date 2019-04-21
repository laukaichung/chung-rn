import * as React from "react"
import Modal from "./Modal";
import {ReactNode} from "react";
import {ListItem} from "./index";
import ChungText from "./ChungText";
import List from "./List";
import Styles from "./Styles";
import {ListItemProps} from "./ListItem";

export interface MenuModalItem {
    text: string;
    onPress: () => void;
    modalRemainsOpenOnPress?: boolean;
    listItemProps?: ListItemProps;
}


interface MenuModalProps {
    menus: MenuModalItem[]
    buttonTrigger: ReactNode
}

const MenuModal = ({menus, buttonTrigger}: MenuModalProps) => {
    return (
        <Modal buttonTrigger={buttonTrigger}>
            {
                ({closeModal}) => {
                    return (
                        <List>
                            {
                                menus.map((o) => {
                                        const {text, listItemProps, modalRemainsOpenOnPress, onPress} = o
                                        return (
                                            <ListItem
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