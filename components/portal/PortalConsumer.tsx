import * as React from "react"
import {PortalMethods} from "./PortalHost";
import {useEffect} from "react";

export type PortalConsumerProps = {
    manager: PortalMethods,
    children: React.ReactNode,
    key?: any;
};

// export default class PortalConsumer extends React.Component<PortalConsumerProps> {
//
//     _key: any;
//
//
//
//
//     componentDidMount() {
//         if (!this.props.manager) {
//             throw new Error(
//                 'You forgot to wrap your root component with `ChungProvider` from `chung-rn`.\n\n',
//             );
//         }
//
//         this._key = this.props.manager.mount(this.props.children, this.props.key);
//     }
//
//     componentDidUpdate() {
//         this.props.manager.update(this._key, this.props.children);
//     }
//
//     componentWillUnmount() {
//         this.props.manager.unmount(this._key);
//     }
//
//     render() {
//         return null;
//     }
// }

const PortalConsumer = ({manager, key, children}: PortalConsumerProps)=> {
    let generatedKey;
    useEffect(()=>{
        if (!manager) {
            throw new Error(
                'You forgot to wrap your root component with `ChungProvider` from `chung-rn`.\n\n',
            );
        }
        generatedKey = manager.mount(children, key);
        return ()=> {
            manager.unmount(key || generatedKey);
        }

    });

    useEffect(()=>{
        manager.update(key || generatedKey, children);
    },[children]);

    return null;
}

export default PortalConsumer;