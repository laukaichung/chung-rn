import * as React from 'react'
import {ReactNode, useEffect, useState} from 'react'
import UIContext, {ThemeContextProps} from "./UIContext";
import Styles, {ChungThemeTypes} from "./Styles";
import AsyncStorage from '@react-native-community/async-storage';

interface ChungContainerProps {
    children: ReactNode
}

const UIAsyncStoreKeys = {
    theme: "theme"
};

const UIProvider = ({children}: ChungContainerProps) => {
    const [fetchingStoreData, setFetchingStoreData] = useState(true);
    const [theme, setTheme] = useState<ChungThemeTypes>(null);
    useEffect(() => {
        AsyncStorage.getItem(UIAsyncStoreKeys.theme).then((newTheme: ChungThemeTypes) => {
            newTheme = newTheme || "light";
            Styles.mode = newTheme;
            setTheme(newTheme);
            setFetchingStoreData(false)
        })
    });

    if (fetchingStoreData) {
        return null;
    }
    return (
        <UIContext.Provider
            value={{
                theme,
                toggleTheme: async () => {
                    let newTheme: ChungThemeTypes = theme === "light" ? "dark" : "light";
                    Styles.mode = newTheme;
                    setTheme(newTheme);
                    await AsyncStorage.setItem(UIAsyncStoreKeys.theme, newTheme);
                },
                isDarkMode: theme === "dark",
            } as ThemeContextProps
            }
        >
            {children}
        </UIContext.Provider>
    )
};

export default UIProvider;