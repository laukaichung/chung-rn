import * as React from 'react'
import ChungView from "../chung-view";
import UIContext from "./UIContext";
import Styles from "../style";

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


