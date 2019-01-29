import * as React from 'react';
import ToastContainer, {ToastProps} from './ToastContainer';
import Portal from "./portal/Portal";
import {Omit} from "react-navigation";

function notice(props:Omit<ToastProps, "onAnimationEnd">) {
    const key = Portal.add(
        <ToastContainer
            {...props}
            onAnimationEnd={() => Portal.remove(key)}
        />,
    );
    return key;
}

export default {
    SHORT: 3,
    LONG: 8,
    show(props: ToastProps) {
        return notice(props);
    },
    success(
        props: ToastProps
    ) {
        return notice({...props,
            type: "success",
            iconProps: {name: "thumbs-up"}
        });
    },
    fail(
        props: ToastProps
    ) {
        return notice({...props,
            type: "fail",
            iconProps: {name: "thumbs-down"}
        });
    },
    loading(props: ToastProps) {
        return notice({...props, type: "loading"});
    },
    bottomInfo(props: ToastProps){
        return notice({...props, type: "bottomInfo", mask: false})
    }
};