import * as React from 'react'
import {ScreenProps} from "../../type";
import {View,Text} from 'react-native'
import Index from "../../grid";

interface GridScreenProps extends ScreenProps {

}

export class GridScreen extends React.Component<GridScreenProps> {
    render() {
        return (
            <View>
                <Index data={[{text: 'ssss'},{text:'zzzz'},{text:'kkk'}]}
                       renderItem={({text}) => {
                          return (
                              <Text>fddf</Text>
                          )
                      }}
                />
            </View>
        )
    }
}
