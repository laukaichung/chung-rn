import * as React from "react"
import ChungText from "../../ChungText";
import UIContainer from "../../UIContainer";
import ChungAlertView from "../../ChungAlertView";
import {AsyncStorage} from "react-native";

export interface ChungAlertScreenProps {}

export default class ChungAlertScreen extends React.Component<ChungAlertScreenProps> {

    render() {
        return (
            <UIContainer>
                <ChungText>
                    Chung Alert!!!!!!!!!!
                </ChungText>
                <ChungAlertView
                    storageKey={"trial"}
                    contentViews={(
                        <ChungText>
                            Effects present letters inquiry no an removed or friends. Desire behind latter me though in. Supposing shameless am he engrossed up additions. My possible peculiar together to. Desire so better am cannot he up before points. Remember mistaken opinions it pleasure of debating. Court front maids forty if aware their at. Chicken use are pressed removed.
                        </ChungText>
                    )}
                />
            </UIContainer>
        )
    }

    /**
     * Clear the previous stored ChungAlertView states in AsyncStorage
     */
    async componentWillMount() {
        await AsyncStorage.clear();
    }
}