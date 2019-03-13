import * as React from 'react'
import Container from "../../UIMainContainer";
import ChungText from "../../ChungText";
import ActionButton from "../../ActionButton";
import Button from "../../Button";
import AsyncStorage from '@react-native-community/async-storage';

interface ActionButtonScreenProps {}

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
