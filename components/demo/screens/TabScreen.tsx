import * as React from 'react'
import {RNScreenProps} from "../demotype";
import TabPane from "../../tabs/TabPane";
import Tabs from "../../tabs/Tabs";

const routes = [
    {
        title: `first`,
        key:"0",
        render: () => <TabPane containerStyle={{backgroundColor: '#ff4081'}}/>
    },
    {
        title: `second`,
        key:"1",
        render: () => {
            alert('renderSecond !!!');
            return <TabPane containerStyle={{backgroundColor: '#673ab7'}}/>
        }
    },
    {
        title: `third`,
        key:"2",
        render: () => {
            alert(`renderThird`);
            return <TabPane containerStyle={{backgroundColor: '#222'}}/>
        }
    },
    {
        title: `Forth`,
        key:"4",
        render: () => {
            alert(`renderFoth`);
            return <TabPane containerStyle={{backgroundColor: '#fff'}}/>
        }
    }

];

interface TabScreenProps extends RNScreenProps {

}

export class TabScreen extends React.Component<TabScreenProps> {
    render() {
        return (
            <Tabs routes={routes}/>
        )
    }
}
