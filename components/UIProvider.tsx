import * as React from 'react'
import {ReactNode} from 'react'
import UIContext, {ThemeContextProps} from "./UIContext";
import {AsyncStorage} from "react-native";
import Styles, {ChungThemeTypes} from "./Styles";

interface ChungContainerProps {
    children: ReactNode
}

interface ChungContainerState extends ThemeContextProps {
    fetchingStoreData: boolean
}


const UIAsyncStoreKeys = {
    theme:"theme"
}

export default class UIProvider extends React.Component<ChungContainerProps, ChungContainerState> {
    public state: ChungContainerState = {fetchingStoreData: true} as ChungContainerState;

    public async componentDidMount() {
        let theme: ChungThemeTypes = await AsyncStorage.getItem(UIAsyncStoreKeys.theme) as ChungThemeTypes;
        theme = theme || "light";
        Styles.mode = theme;
        this.setState({theme, fetchingStoreData: false});
    }

    public render() {
        let {fetchingStoreData, theme} = this.state;
        if (fetchingStoreData) {
            return null;
        }
        return (
            <UIContext.Provider value={{
                theme,
                toggleTheme: async () => {
                    let newTheme: ChungThemeTypes = theme === "light" ? "dark" : "light";
                    Styles.mode = newTheme;
                    this.setState({theme: newTheme});
                    await AsyncStorage.setItem(UIAsyncStoreKeys.theme, newTheme);
                },
                isDarkMode: theme === "dark"
            } as ThemeContextProps
            }>
                {this.props.children}
            </UIContext.Provider>
        )
    }
}



