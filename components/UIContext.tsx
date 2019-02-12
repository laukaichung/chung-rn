import * as React from 'react'
import {ChungThemeTypes} from "./Styles";



export interface ThemeContextProps {
    theme:ChungThemeTypes;
    toggleTheme:()=>void;
    isDarkMode:boolean;
    setLayoutHeight: (height: number)=> void;
    layoutHeight: number
}
export const UIContext = React.createContext<ThemeContextProps>(
    {
        theme:"light",
        toggleTheme: null,
        isDarkMode:false,
        layoutHeight: null,
        setLayoutHeight: null,
    });

export default UIContext
