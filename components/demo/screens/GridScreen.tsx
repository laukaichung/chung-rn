import * as React from 'react'
import {ScreenProps} from "../../type";
import {View, Text} from 'react-native'
import Grid from "../../grid";

interface GridScreenProps extends ScreenProps {

}

export class GridScreen extends React.Component<GridScreenProps> {
    render() {
        return (
            <View>
                <Grid
                    isCarousel
                    carouselMaxRow={1}
                    columnNum={3}
                    data={[
                        {
                            text: 'ssss',
                            icon: 'https://s.gravatar.com/avatar/a7e84bef6cdf886d06c33ebe62a36d0c?size=50&default=retro'
                        },
                        {
                            text: 'zzzz',
                            icon: 'https://s.gravatar.com/avatar/a7e84bef6cdf886d06c33ebe62a36d0c?size=50&default=retro'
                        },
                        {
                            text: 'kkk',
                            icon: 'https://s.gravatar.com/avatar/a7e84bef6cdf886d06c33ebe62a36d0c?size=50&default=retro'
                        },
                        {
                            text: 'xxx',
                            icon: 'https://s.gravatar.com/avatar/a7e84bef6cdf886d06c33ebe62a36d0c?size=50&default=retro'
                        },
                        {
                            text: 'sss',
                            icon: 'https://s.gravatar.com/avatar/a7e84bef6cdf886d06c33ebe62a36d0c?size=50&default=retro'
                        },
                        {
                            text: 'eee',
                            icon: 'https://s.gravatar.com/avatar/a7e84bef6cdf886d06c33ebe62a36d0c?size=50&default=retro'
                        },
                        {
                            text: 'ttt',
                            icon: 'https://s.gravatar.com/avatar/a7e84bef6cdf886d06c33ebe62a36d0c?size=50&default=retro'
                        },
                        {
                            text: 'yyy',
                            icon: 'https://s.gravatar.com/avatar/a7e84bef6cdf886d06c33ebe62a36d0c?size=50&default=retro'
                        },
                        {
                            text: 'AA',
                            icon: 'https://s.gravatar.com/avatar/a7e84bef6cdf886d06c33ebe62a36d0c?size=50&default=retro'
                        }
                        ]}
                />
            </View>
        )
    }
}
