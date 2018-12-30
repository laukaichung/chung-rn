import * as React from 'react'
import ChungView from "../chung-view/ChungView";
import UIContext from "./UIContext";
import Styles from "../styles/Styles";

const UIContainer = (props) => {
    return (
        <UIContext.Consumer>
            {
                ({theme}) => {
                    return (<ChungView {...props} style={{backgroundColor: Styles.backgroundColor,flex:1}}/>)
                }
            }
        </UIContext.Consumer>
    )
};

export default UIContainer;


