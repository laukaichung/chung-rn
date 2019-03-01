import * as React from "react"
import HintText from "../../HintText";
import UIMainContainer from "../../UIMainContainer";

interface HintTextScreenProps {

}


export default class HintTextScreen extends React.Component<HintTextScreenProps> {
    render() {
        return (
            <UIMainContainer>
                <HintText icon="sitemap">
                    Arrival entered an if drawing request.
                    How daughters not promotion few knowledge contented.
                    Yet winter law behind number stairs garret excuse.
                    Minuter we natural conduct gravity if pointed oh no.
                    Am immediate unwilling of attempted admitting disposing it.
                    Handsome opinions on am at it ladyship.
                </HintText>
                <HintText icon="sitemap">
                    Two before narrow not relied how except moment myself. Dejection assurance mrs led certainly.
                </HintText>
            </UIMainContainer>
        )
    }
}