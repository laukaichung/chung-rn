import * as React from 'react'
import {ReactNode} from 'react'
import ThemeContext, {ThemeContextProps} from "./ThemeContext";
import {AsyncStorage} from "react-native";
import Styles, {ChungThemeTypes} from "../style";

interface ChungContainerProps {
    children: ReactNode
}

interface ChungContainerState extends ThemeContextProps {
    fetchingStoreData: boolean
}

export default class ThemeProvider extends React.Component<ChungContainerProps, ChungContainerState> {
    public state: ChungContainerState = {fetchingStoreData: true} as ChungContainerState;

    public async componentDidMount() {
        let theme: ChungThemeTypes = await AsyncStorage.getItem("theme") as ChungThemeTypes;
        theme = theme || "light";
        Styles.mode = theme;
        this.setState({theme, fetchingStoreData: false});
        console.log("componentWillMount", theme);
    }

    public render() {
        let {fetchingStoreData, theme} = this.state;
        if (fetchingStoreData) {
            return null;
        }
        return (
            <ThemeContext.Provider value={{
                theme,
                toggleTheme: async () => {
                    let newTheme: ChungThemeTypes = theme === "light" ? "dark" : "light";
                    Styles.mode = newTheme;
                    this.setState({theme: newTheme});
                    await AsyncStorage.setItem("theme", newTheme);
                },
                isDarkMode: theme === "dark"
            } as ThemeContextProps
            }>
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}



