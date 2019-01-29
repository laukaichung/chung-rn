import * as React from 'react'
import {NavigationProps} from "../demotype";
import {Toast} from "../../index";
import Button from "../../Button";
import UIContainer from "../../UIContainer";

export class ToastScreen extends React.Component<NavigationProps> {
    public render() {
        return (
            <UIContainer>
                <Button
                    onPress={() => {
                        Toast.show({
                            content: "show context",
                        })
                    }}
                >
                    Show Toast
                </Button>

                <Button
                    onPress={() => {
                        Toast.bottomInfo({
                            content: "So in relation to your question the following might be what you want"
                        })
                    }}
                >
                    Bottom Info Toast
                </Button>

                <Button
                    onPress={() => {
                        Toast.success({
                            content: "success toast shown"
                        })
                    }}
                >
                    Success Toast
                </Button>

                <Button
                    onPress={() => {
                        Toast.fail({
                            content: "fail toast shown"
                        })
                    }}
                >
                    Fail Toast
                </Button>
            </UIContainer>
        )
    }

}
