import * as React from "react"
import ChungAlertContainer, {ChungAlertProps} from "./ChungAlertContainer";
import Portal from "./portal/Portal";
import {OptionalExceptFor} from "./type";
import {AsyncStorage} from "react-native";

interface ChungAlertViewProps extends OptionalExceptFor<ChungAlertProps, "view"> {
    storageKey: string;
}

const PREFIX = "chung_alert";

export default class ChungAlertView extends React.Component<ChungAlertViewProps> {
    private key: number = null;

    public render() {
        return null;
    }

    public async componentDidMount() {
        const {storageKey} = this.props;
        const shouldNotShowInitially = await AsyncStorage.getItem(PREFIX+storageKey);
        if (String(shouldNotShowInitially) !== "true") {
            this.key = Portal.add(
                <ChungAlertContainer
                    {...this.props}
                    onClose={ async ({shouldNotShow}) => {
                        await AsyncStorage.setItem(PREFIX+storageKey, String(shouldNotShow));
                        Portal.remove(this.key)
                    }}
                />
            )
        }
    }

    public componentWillUnmount(): void {
        if (this.key) {
            Portal.remove(this.key)
        }
    }
}