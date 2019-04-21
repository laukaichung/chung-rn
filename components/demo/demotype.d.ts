import {NavigationScreenProp} from "react-navigation";
export interface NavigationProps<Parameters = any,State = Object> {
    navigation:NavigationScreenProp<State,Parameters>
}


