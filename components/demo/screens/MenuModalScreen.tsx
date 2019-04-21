import * as React from "react"
import MenuModal, {MenuModalItem} from "../../MenuModal";
import Button from "../../Button";

export default class MenuModalScreen extends React.Component {

    render() {

        const menus: MenuModalItem[] = [
            {
                text: "Edit",
                onPress: () => {
                    alert("edit")
                },
                modalRemainsOpenOnPress: true,
            },
            {
                text: "Testing",
                onPress: () => {
                    alert("testing")
                }
            }
        ];

        return (
            <MenuModal
                menus={menus}
                buttonTrigger={(
                    <Button>
                        Open Modal
                    </Button>
                )}
            />
        )
    }
}