import * as React from 'react'
import {AsyncStorage, ScrollView, View} from "react-native";
import Container from "../../UIContainer";
import ChungText from "../../ChungText";
import ActionButton from "../../ActionButton";
import Button from "../../Button";

interface ActionButtonScreenProps {

}

export const ActionButtonScreen = ({}: ActionButtonScreenProps) => {
    return (
        <Container>
            <ChungText>Action Button fdsfsddf </ChungText>
            <Button
                onPress={async () => {
                    await AsyncStorage.removeItem("chung_actionButton");
                }}
            >
                Remove
            </Button>
            <ActionButton
                onPress={() => alert("dfdf")}
                storageKey={"chung_actionButton"}
            />
        </Container>
    )
};
