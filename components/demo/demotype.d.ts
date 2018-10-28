export interface RNScreenProps {
    navigation:RNNavigationProps;

}

interface RNNavigationProps {
    navigate:(screen:string,params?:Object)=>void;
    getParam:(key:string,defaultVal:any)=>void
    goBack:()=>void;
    state:{
        params:any
    }
}

