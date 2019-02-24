import * as React from 'react'
import Grid from "../../Grid";
import {NavigationProps} from "../demotype";
import UIMainContainer from "../../UIMainContainer";


export class GridScreen extends React.Component<NavigationProps> {

    render() {
        return (
            <UIMainContainer>
                <Grid
                    isCarousel
                    carouselMaxRow={1}
                    tabletNumColumns={4}
                    mobileNumColumns={3}
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
            </UIMainContainer>
        )
    }
}
