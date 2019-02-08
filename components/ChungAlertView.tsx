import * as React from "react"
import {ChungAlertProps} from "./ChungAlertContainer";
import Portal from "./portal/Portal";
import ChungAlert from "./ChungAlert";
import {OptionalExceptFor} from "./type";

interface ChungAlertViewProps {
    alertProps: OptionalExceptFor<ChungAlertProps, "contentViews">;
}

export default class ChungAlertView extends React.Component<ChungAlertViewProps>{
    private key:number = null;
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