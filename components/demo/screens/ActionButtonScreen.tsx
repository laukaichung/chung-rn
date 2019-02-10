import * as React from 'react'
import {View} from "react-native";
import Container from "../../UIContainer";
import ChungText from "../../ChungText";
import ActionButtonModal from "../../ActionButtonModal";

interface ActionButtonScreenProps {

}

export const ActionButtonScreen = ({}: ActionButtonScreenProps) => {
    return (
        <Container>
            <ChungText>Action Button fdsfsddf </ChungText>
            <ActionButtonModal>
                {
                    () => (
                        <View>
                            <ChungText>Hello</ChungText>
                        </View>
                    )
                }
            </ActionButtonModal>
        </Container>
    )
};
