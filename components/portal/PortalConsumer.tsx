import * as React from "react"
import {PortalMethods} from "./PortalHost";

export type PortalConsumerProps = {
    manager: PortalMethods,
    children: React.ReactNode,
};

export default class PortalConsumer extends React.Component<PortalConsumerProps> {

    _key: any;
    componentDidMount() {
        if (!this.props.manager) {
            throw new Error(
                'You forgot to wrap your root component with `Provider` component from `chung-rn`.\n\n',
            );
        }

        this._key = this.props.manager.mount(this.props.children);
    }

    componentDidUpdate() {
        console.log(this._key);
        this.props.manager.update(this._key, this.props.children);
    }

    componentWillUnmount() {
        console.log(this._key);
        this.props.manager.unmount(this._key);
    }

    render() {
        return null;
    }
}