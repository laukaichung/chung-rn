import * as React from 'react';
import {
    DefaultTabBar as RMCDefaultTabBar,
    Tabs as RMCTabs,
} from 'rmc-tabs/lib/index.native';
import {Models, PropsType} from 'rmc-tabs';
import Styles from "../style";

interface TabsProps extends PropsType {
    /** render for replace the tab of tabbar. */
    renderTab?: (tab: Models.TabData) => React.ReactNode;
}

export default class Tabs extends React.PureComponent<TabsProps, {}> {
    public static DefaultTabBar = RMCDefaultTabBar;

    static defaultProps = {tabBarPosition:"bottom"} as TabsProps;

    renderTabBar = (props: any) => {
        const {renderTab} = this.props;
        return (
            <RMCDefaultTabBar
                styles={styles}
                {...props}
                renderTab={renderTab}
            />
        );
    }

    render() {
        return (
            <RMCTabs
                styles={styles as any}
                renderTabBar={this.renderTabBar}
                {...this.props}
            />
        );
    }
}

const styles = {
    Tabs: {
        container: {
            flex: 1,
        },
        topTabBarSplitLine: {
            borderBottomColor: Styles.borderColor,
            borderBottomWidth: 1,
        },
        bottomTabBarSplitLine: {
            borderTopColor: Styles.borderColor,
            borderTopWidth: 1,
        },
    },
    TabBar: {
        container: {},
        tabs: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: Styles.backgroundColor,
            justifyContent: 'space-around',
            shadowRadius: 0,
            shadowOpacity: 0,
            elevation: 0,
        },
        tab: {
            height: 42,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            flexDirection: 'row',
        },
        underline: {
            height: 2,
            backgroundColor: Styles.brandPrimary,
        },
        textStyle: {
            fontSize: 15,
        },
        activeTextColor: Styles.brandPrimary,
        inactiveTextColor: Styles.textBaseColor,
    },
};
