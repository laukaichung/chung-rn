import * as React from 'react'
import ChungView from "../chung-view";
import ThemeContext from "./ThemeContext";
import Styles from "../style";

const ThemeContainer = (props) => {
    return (
        <ThemeContext.Consumer>
            {
                ({theme}) => {
                    return (<ChungView {...props} style={{backgroundColor: Styles.backgroundColor,flex:1}}/>)
                }
            }
        </ThemeContext.Consumer>
    )
};

export default ThemeContainer;


