import * as React from "react"
import {ChungAlertProps} from "./ChungAlertContainer";
import Portal from "./portal/Portal";
import ChungAlert from "./ChungAlert";

interface ChungAlertViewProps {
    alertProps: ChungAlertProps;
}
export class ChungAlertView extends React.Component<ChungAlertViewProps>{
    private key:number;

    public render(){
        return null;
    }

    public componentDidMount(): void {
        this.key = ChungAlert.add(this.props.alertProps)
    }

    public componentWillUnmount(): void {
        Portal.remove(this.key)
    }
}