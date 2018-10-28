import * as React from 'react';
import {View} from 'react-native';
import {PagerPan, SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {ResolutionUtil} from "../util/ResolutionUtil";
import {ReactNode} from "react";


interface Props{
    animationEnabled?:boolean;
    swipeEnabled?:boolean;
    tabBarPosition?:"top"|"bottom"
    routes: TabRoute[]

}

export interface TabRoute {
    title: string;
    key:string;
    render?:()=>ReactNode
}

interface State {
    index: number,
    routes: TabRoute[];
}

export default class Tabs extends React.Component<Props, State> {

    static TabPane;

    constructor(props) {
        super(props);

        let routes:TabRoute[] = []
        this.props.routes.forEach(r=>{
            if(r === null){
                return;
            }
            routes.push({key: r.key, title: r.title})
        });

        this.state = {
            index: 0,
            routes
        }
    }

    render() {
        let {animationEnabled,tabBarPosition = "bottom",swipeEnabled,routes} = this.props;
        let {index} = this.state;
        return (
            <TabView
                {...{swipeEnabled,tabBarPosition,animationEnabled}}
                navigationState={this.state}
                renderTabBar={(data) => {
                    return (
                        <TabBar
                            {...data}
                            canJumpToTab={false}
                            scrollEnabled
                            indicatorStyle={{backgroundColor: 'pink'}}
                        />
                    )
                }}
                onIndexChange={index => this.setState({ index })}
                renderScene={({route}) => {
                    if (Math.abs(index - this.state.routes.indexOf(route)) > 0) {
                        return <View />;
                    }

                    return routes[index].render();
                }}
                initialLayout={{width: ResolutionUtil.fullWidth(), height: ResolutionUtil.fullHeight()}}
            />
        );
    }
}


