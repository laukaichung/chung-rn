export interface ScreenProps {
    navigation:NavigationProps
}

interface NavigationProps {
    navigate:(screen:string)=>void;
}
