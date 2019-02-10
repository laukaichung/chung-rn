import * as React from "react"
import {ReactNode} from "react"
import {Switch, View, ViewStyle} from "react-native";
import Button from "./Button";
import WhiteSpace from "./WhiteSpace";
import ChungText from "./ChungText";
import Styles from "./Styles";

interface OnClose {
    shouldNotShow: boolean
}

export interface ChungAlertProps {
    onClose: (data: OnClose) => void;
    contentViews: ReactNode;
    containerStyle?: ViewStyle;
}

interface State {
    shouldNotShow: boolean
}

export default class ChungAlertContainer extends React.Component<ChungAlertProps, State> {
    public state: State = {shouldNotShow: false};

    public render() {
        const {onClose, containerStyle, contentViews} = this.props;
        const {shouldNotShow} = this.state;
        return (
            <View
                style={{
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
                                margin: Styles.margin,
                                borderBottomWidth: 5,
                                borderBottomColor: Styles.secondaryColor
                            },
                            containerStyle
                        ]
                    }
                >
                    {contentViews}
                    <WhiteSpace size="lg">
                        <Button
                            onPress={() => onClose({shouldNotShow})}
                            style={{alignSelf: 'center', paddingHorizontal: Styles.paddingXl}}
                        >
                            Close
                        </Button>
                        <WhiteSpace/>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <ChungText>
                                Do not show it again.
                            </ChungText>
                            <Switch
                                value={shouldNotShow}
                                onValueChange={(shouldNotShow) => {
                                    this.setState({shouldNotShow});
                                }}
                            />
                        </View>
                    </WhiteSpace>
                </View>
            </View>
        )
    }

}

