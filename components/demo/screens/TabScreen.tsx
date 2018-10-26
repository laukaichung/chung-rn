import * as React from 'react'
import {ScreenProps} from "../../type";
import {Tabs} from "../../tabs/Tabs";
import {TabPane} from "../../tabs/TabPane";

interface InputItemScreenProps extends ScreenProps {

}

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
    }

];

export class TabScreen extends React.Component<InputItemScreenProps> {
    render() {
        return (
            <Tabs routes={routes}/>
        )
    }
}
