import * as React from "react"
import ChungText from "../../ChungText";
import UIMainContainer from "../../UIMainContainer";
import ChungAlert from "../../ChungAlert";

export interface ChungAlertScreenProps {}

export default class ChungAlertScreen extends React.Component<ChungAlertScreenProps> {

    render() {
        return (
            <UIMainContainer>
                <ChungText>
                    Chung Alert!!!!!!!!!!
                </ChungText>
                <ChungAlert
                    storageKey={"trial"}
                    view={(
                        <ChungText>
                            Effects present letters inquiry no an removed or friends. Desire behind latter me though in. Supposing shameless am he engrossed up additions. My possible peculiar together to. Desire so better am cannot he up before points. Remember mistaken opinions it pleasure of debating. Court front maids forty if aware their at. Chicken use are pressed removed.
                        </ChungText>
                    )}
                />
            </UIMainContainer>
        )
    }

    // /**
    //  * Clear the previous stored ChungAlert states in AsyncStorage
    //  */
    // async componentWillMount() {
    //     await AsyncStorage.clear();
    // }
}