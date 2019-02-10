import * as React from "react"
import {OptionalExceptFor} from "./type";
import ChungAlertContainer, {ChungAlertProps} from "./ChungAlertContainer";
import Portal from "./portal/Portal";

export default class ChungAlert {

    static add(props: OptionalExceptFor<ChungAlertProps, "view">) {
        const key = Portal.add(
            <ChungAlertContainer
                {...props}
                onClose={ async (data) => {
                    props.onClose(data);
                    Portal.remove(key)
                }}
            />
        );
        return key;
    }
}


