import * as React from 'react'
import {ChungThemeTypes} from "./Styles";
import {LayoutRectangle} from "react-native";

interface Layout extends LayoutRectangle{
    headerHeight: number;
}

export interface ThemeContextProps extends Partial<Layout>{
    theme:ChungThemeTypes;
    toggleTheme:()=>void;
    isDarkMode:boolean;
    setLayout: (data: Layout)=> void;
}
export const UIContext = React.createContext<ThemeContextProps>(
    {
        theme:"light",
        toggleTheme: null,
        isDarkMode:false,
        setLayout: null,
    });

export default UIContext
