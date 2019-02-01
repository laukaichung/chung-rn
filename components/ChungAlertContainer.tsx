import * as React from "react"
import {Switch, View, ViewStyle} from "react-native";
import {ReactNode} from "react";
import Button from "./Button";
import WhiteSpace from "./WhiteSpace";
import ChungText from "./ChungText";
import Styles from "./Styles";

export interface ChungAlertProps {
    onClose: () => void;
    contentViews: ReactNode;
    containerStyle?: ViewStyle;
}

interface State {
    showAgain: boolean
}

export default class ChungAlertContainer extends React.Component<ChungAlertProps, State> {
    public state: State = {showAgain: true};

    public render() {
        const {onClose, containerStyle, contentViews} = this.props;
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: Styles.toastZIndex,
            }}
            >
                <View
                    style={
                        [
                            {
                                padding: Styles.padding,
                                backgroundColor: Styles.backgroundColor,
                                borderColor: Styles.borderColor,
                                borderWidth: Styles.borderWidth,
                                borderRadius: 5,
                            },
                            containerStyle
                        ]
                    }
                >
                    {contentViews}
                    <WhiteSpace size="lg">
                        <Button
                            onPress={onClose}
                            style={{alignSelf: 'center', paddingHorizontal: Styles.paddingXl}}
                        >
                            Close
                        </Button>
                        <WhiteSpace/>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <ChungText>
                                Show this again next time
                            </ChungText>
                            <Switch
                                value={this.state.showAgain}
                                onValueChange={(showAgain) => {
                                    this.setState({showAgain});
                                }}
                            />
                        </View>
                    </WhiteSpace>
                </View>
            </View>
        )
    }
}

