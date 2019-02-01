import * as React from "react"
import {View} from "react-native";
import ChungText from "../../ChungText";
import ChungAlert from "../../ChungAlert";
import UIContainer from "../../UIContainer";
import Portal from "../../portal/Portal";
import ChungAlertContainer from "../../ChungAlertContainer";

export interface ChungAlertScreenProps {

}

export default class ChungAlertScreen extends React.Component<ChungAlertScreenProps> {

    render() {
        return (
            <UIContainer>
                <ChungText>
                    Chung Alert!!!!!!!!!!
                </ChungText>
            </UIContainer>
        )
    }

    componentDidMount() {
        // setTimeout(()=>{
        //     ChungAlert.add(
        //         {
        //             contentViews: (
        //                 <View>
        //                     <ChungText>
        //                         Some alert text!
        //                     </ChungText>
        //                 </View>
        //             )
        //         }
        //     );
        // },100)

        /**
         * This won't work when this is the initial route!
         */
        ChungAlert.add(
            {
                contentViews: (
                    <View>
                        <ChungText>
                            Some alert text!
                        </ChungText>
                    </View>
                )
            }
        );

    }
}