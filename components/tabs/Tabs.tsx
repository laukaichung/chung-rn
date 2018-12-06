import * as React from 'react';
import {
    DefaultTabBar as RMCDefaultTabBar,
    Tabs as RMCTabs,
} from 'rmc-tabs/lib/index.native';
import {Models, PropsType} from 'rmc-tabs';
import Styles from "../style";
import UIContext from "../ui-provider/UIContext";

interface TabsProps extends PropsType {
    /** render for replace the tab of tabbar. */
    renderTab?: (tab: Models.TabData) => React.ReactNode;
}

export default class Tabs extends React.PureComponent<TabsProps, {}> {
    public static DefaultTabBar = RMCDefaultTabBar;
    static defaultProps = {};

    render() {
        const { renderTab,tabBarPosition="bottom" } = this.props;
        return (
            <UIContext.Consumer>
                {
                    ({isDarkMode})=>{
                        const tabStyles = {
                            Tabs: {
                                container: {
                                    flex: 1,
                                },
                                topTabBarSplitLine: {
                                    borderBottomColor: Styles.primaryColor,
                                    borderBottomWidth: 1,
                                },
                                bottomTabBarSplitLine: {
                                    borderTopColor: Styles.primaryColor,
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
                                    backgroundColor: Styles.backgroundColor,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 0,
                                    flexDirection: 'row',
                                },
                                underline: {
                                    height: 2,
                                    backgroundColor: Styles.primaryColor,
                                },
                                textStyle: {
                                    fontSize: 15,
                                },
                                activeTextColor: Styles.primaryColor,
                                inactiveTextColor: Styles.disabledTextColor,
                            },
                        };

                        return (
                            <RMCTabs
                                tabBarPosition={tabBarPosition}
                                styles={tabStyles as any}
                                renderTabBar={(props)=>{
                                    return <RMCDefaultTabBar
                                        styles={tabStyles as any}
                                        {...props}
                                        renderTab={renderTab}
                                    />
                                }}
                                {...this.props}
                            />
                        );
                    }
                }
            </UIContext.Consumer>
        )

    }
}


