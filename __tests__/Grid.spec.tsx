import * as React from 'react'
import * as renderer from 'react-test-renderer';
import {ReactTestRenderer} from 'react-test-renderer';
import {Text,Image, View} from 'react-native';
import Grid from "../components/grid/Grid";


const data = [
    {
        text:"A",
        icon:"https://avatars2.githubusercontent.com/u/5750?s=40&v=4"
    },
    {
        text:"B",
        icon:"https://avatars0.githubusercontent.com/u/44201792?s=88&v=4"
    }

]

describe(`Grid`, () => {
    let testRenderer: ReactTestRenderer;
    beforeAll(async () => {
        testRenderer = renderer.create((
            <Grid data={data}
                  renderItem={({text,icon})=>{
                      return (
                          <View>
                              <Image source={{uri:icon}}/>
                              <Text>{text}</Text>
                          </View>
                      )
            }}/>
        ));
    });

    // it(`Should contain a grid` , () => {
    //     expect(testRenderer.root.findByType(Grid).findAllByType(Image).length).toBe(data.length);
    //
    // });

});

