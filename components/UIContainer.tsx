import * as React from 'react'
import ChungView from "./ChungView";
import UIContext from "./UIContext";
import Styles from "./Styles";

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


