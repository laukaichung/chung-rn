import * as React from 'react';
import ToastContainer, {ToastProps} from './ToastContainer';
import Portal from "./portal/Portal";

function notice(props:ToastProps) {
    const key = Portal.add(
        <ToastContainer
            {...props}
            onClose={() =>{
                Portal.remove(key)
            }}
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
    },
    requireLogin(props: ToastProps = {} as ToastProps){
        return notice({
            ...props,
            content: `Please log in first`,
            mask: false,
            iconProps: {
                name: "sign-in"
            },
        })
    }
};