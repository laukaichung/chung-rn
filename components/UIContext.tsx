import * as React from 'react'
import {ChungThemeTypes} from "./Styles";

export interface ThemeContextProps {
    theme:ChungThemeTypes;
    toggleTheme:()=>void;
    isDarkMode:boolean;
}
export const UIContext = React.createContext<ThemeContextProps>(
    {
        theme:"light",
        toggleTheme:()=>{},
        isDarkMode:false
    });

export default UIContext
