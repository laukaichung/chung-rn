import * as React from 'react'
import UIContext from "./UIContext";
import Styles from "./Styles";
import {View} from "react-native";

const UIContainer = (props) => {
    return (
        <UIContext.Consumer>
            {
                ({theme}) => {
                    return (<View {...props} style={{backgroundColor: Styles.backgroundColor,flex:1}}/>)
                }
            }
        </UIContext.Consumer>
    )
};

export default UIContainer;


