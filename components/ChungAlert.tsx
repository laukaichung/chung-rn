import * as React from "react"
import {ReactNode} from "react"
import Portal from "./portal/Portal";
import {AsyncStorage, Switch, View, ViewStyle} from "react-native";
import Styles from "./Styles";
import WhiteSpace from "./WhiteSpace";
import Button from "./Button";
import ChungText from "./ChungText";
import Overlay from "./Overlay";

interface ChungAlertViewProps {
    storageKey: string;
    view: ReactNode;
    containerStyle?: ViewStyle;
}

interface State {
    show: boolean;
    shouldNotShowVal: boolean;
}

export default class ChungAlert extends React.Component<ChungAlertViewProps, State> {
    public state: State = {show: false, shouldNotShowVal: false};

    public render() {
        const {show, shouldNotShowVal} = this.state;
        if (!show) {
            return null;
        }
        const {containerStyle, view, storageKey} = this.props;
        const alertView = (
            <Overlay
                enabled
                onPress={null}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
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
                        {view}
                        <WhiteSpace size="lg">
                            <Button
                                onPress={async () => {
                                    //await AsyncStorage.setItem(storageKey, String(shouldNotShowAgain));
                                    this.setState({show: false})
                                }}
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
                                    Don't show it again.
                                </ChungText>
                                <Switch
                                    value={shouldNotShowVal}
                                    onValueChange={async (newShouldNotShowVal) => {
                                        this.setState({shouldNotShowVal: newShouldNotShowVal});
                                        if (newShouldNotShowVal) {
                                            await AsyncStorage.setItem(storageKey, String(newShouldNotShowVal));
                                        } else {
                                            await AsyncStorage.removeItem(storageKey);
                                        }

                                    }}
                                />
                            </View>
                        </WhiteSpace>
                    </View>
                </View>
            </Overlay>
        );


        return (
            <Portal>
                {alertView}
            </Portal>
        );

    }

    public async componentDidMount() {
        const {storageKey} = this.props;
        const exist = await AsyncStorage.getItem(storageKey);
        const shouldNotShowVal = exist != null;
        this.setState({show: !shouldNotShowVal, shouldNotShowVal})
    }

}