import * as React from 'react'
import {Text, View} from "react-native";
import {RNScreenProps} from "../demotype";
import List from "../../list/List";

interface ListScreenProps extends RNScreenProps {

}

export class ListScreen extends React.Component<ListScreenProps> {
    render() {
        return (
            <View>
                <List
                    renderHeader={() => {
                        return (
                            <View style={{padding: 10, backgroundColor: '#eee'}}>
                                <Text>Header</Text>
                            </View>
                        )
                    }}
                    renderFooter={()=>{
                        return (
                            <View style={{padding:10,backgroundColor:'#eee'}}>
                                <Text>Footer</Text>
                            </View>
                        )
                    }}
                >
                    <List.Item
                        multipleLine
                        thumb={`https://www.gravatar.com/avatar/c397c57d2406dc110a9da249fc0d4292?s=32&d=identicon&r=PG&f=1`}
                        arrow="horizontal">
                        <Text numberOfLines={5}>Hello, this is a list item g dfdfsfdsdfs dds df sdf sdf sdsf  dfs dsf dsfd sfd sfdsf dfs  ffgdfdgdgf fdg fgd fdgfdgfgd dfg fdfdg</Text>
                    </List.Item>
                    <List.Item>
                        <Text>Hello, last one doesn't have a borderBottom</Text>
                    </List.Item>
                    <List.Item
                        onLongPress={()=>alert('dfdfdf')}
                        disableBorderBottom>
                        <Text>Hello, last one doesn't have a borderBottom</Text>
                    </List.Item>
                </List>
            </View>
        )
    }
}
