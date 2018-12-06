import * as React from 'react'
import {ChungThemeTypes} from "../style";

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
