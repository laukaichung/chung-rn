import * as React from "react"
import PortalHost, {portal, PortalContext} from "./PortalHost";
import PortalConsumer from "./PortalConsumer";

export type PortalProps = {
    /**
     * Content of the `Portal`.
     */
    children?: React.ReactNode;
};

class Portal extends React.Component<PortalProps> {
    static Host = PortalHost;
    static add = portal.add;
    static remove = portal.remove;
    render() {
        const { children } = this.props;
        return (
            <PortalContext.Consumer>
                {manager => (
                    <PortalConsumer manager={manager}>
                        {children}
                    </PortalConsumer>
                )}
            </PortalContext.Consumer>
        );
    }
}


export default Portal;