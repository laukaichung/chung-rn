import * as React from "react"
import {OptionalExceptFor} from "./type";
import ChungAlertContainer, {ChungAlertProps} from "./ChungAlertContainer";
import Portal from "./portal/Portal";

export default class ChungAlert {

    static add(props: OptionalExceptFor<ChungAlertProps, "contentViews">) {
        const key = Portal.add(
            <ChungAlertContainer
                {...props}
                onClose={() => Portal.remove(key)}
            />
        );
        return key;
    }
}


