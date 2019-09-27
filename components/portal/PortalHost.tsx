import * as React from 'react';
import {useEffect} from 'react';
import {DeviceEventEmitter, NativeEventEmitter, StyleSheet, View} from 'react-native';
import PortalManager from "./PortalManager";

export type PortalHostProps = {
    children: React.ReactNode;
};

export type Operation =
    | { type: 'mount'; key: number; children: React.ReactNode }
    | { type: 'update'; key: number; children: React.ReactNode }
    | { type: 'unmount'; key: number };

export type PortalMethods = {
    mount: (children: React.ReactNode, key?: any) => number;
    update: (key: any, children: React.ReactNode) => void;
    unmount: (key: any) => void;
};

export const PortalContext = React.createContext<PortalMethods>(null as any);
// events
const addType = 'ANT_DESIGN_MOBILE_RN_ADD_PORTAL';
const removeType = 'ANT_DESIGN_MOBILE_RN_REMOVE_PORTAL';
// fix react native web does not support DeviceEventEmitter
const TopViewEventEmitter = DeviceEventEmitter || new NativeEventEmitter();


/**
 * Portal host renders all of its children `Portal` elements.
 * For example, you can wrap a screen in `Portal.Host` to render items above the screen.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Text } from 'react-native';
 * import { Portal } from '@ant-design/react-native';
 *
 * export default class MyComponent extends React.Component {
 *   render() {
 *     return (
 *       <Portal.Host>
 *         <Text>Content of the app</Text>
 *       </Portal.Host>
 *     );
 *   }
 * }
 * ```
 *
 * Here any `Portal` elements under `<App />` are rendered alongside `<App />` and will appear above `<App />` like a `Modal`.
 */

// todo Portal won't render components when the portal.add() is added on the first screen.
// Try putting ChungAlertScreen as initial route and you will see the alert won't get rendered.
// One temporary salutation is to use setTimeout() to delay the portal.add() function.

const PortalHost = ({children}: PortalHostProps) => {
    //const displayName = 'Portal.Host';
    let _nextKey = 0;
    let queue: Operation[] = [];
    let manager: PortalManager;
    const _mount = (children: React.ReactNode, _key?: number) => {
        const key = _key || _nextKey++;
        if (manager) {
            manager.mount(key, children);
        } else {
            queue.push({type: 'mount', key, children});
        }

        return key;
    };

    const _unmount = (key: number) => {
        if (manager) {
            manager.unmount(key);
        } else {
            queue.push({type: 'unmount', key});
        }
    };

    const _update = (key: number, children: React.ReactNode) => {
        if (manager) {
            manager.update(key, children);
        } else {
            const op: Operation = {type: 'mount', key, children};
            const index = queue.findIndex(
                o => o.type === 'mount' || (o.type === 'update' && o.key === key),
            );

            if (index > -1) {
                queue[index] = op;
            } else {
                queue.push(op);
            }
        }
    };

    useEffect(() => {
        TopViewEventEmitter.addListener(addType, _mount);
        TopViewEventEmitter.addListener(removeType, _unmount);
        while (queue.length && manager) {
            const action = queue.pop();
            if (!action) {
                continue;
            }
            // tslint:disable-next-line:switch-default
            switch (action.type) {
                case 'mount':
                    manager.mount(action.key, action.children);
                    break;
                case 'update':
                    manager.update(action.key, action.children);
                    break;
                case 'unmount':
                    manager.unmount(action.key);
                    break;
            }
        }
        return () => {
            TopViewEventEmitter.removeListener(addType, _mount);
            TopViewEventEmitter.removeListener(removeType, _unmount);
        }
    });

    return (
        <PortalContext.Provider
            value={{
                mount: _mount,
                update: _update,
                unmount: _unmount,
            }}
        >
            {/* Need collapsable=false here to clip the elevations, otherwise they appear above Portal components */}
            <View style={styles.container} collapsable={false}>
                {children}
            </View>
            <PortalManager ref={(managerRef)=> manager = managerRef}/>
        </PortalContext.Provider>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

class PortalGuard {

    private nextKey = 10000;

    add = (e: React.ReactNode) => {
        const key = this.nextKey++;
        TopViewEventEmitter.emit(addType, e, key);
        return key;
    };
    remove = (key: number) => TopViewEventEmitter.emit(removeType, key);
}

/**
 * portal
 */
export const portal = new PortalGuard();

export default PortalHost;