import * as React from 'react'
import {Image, ImageProps} from "react-native";

const ChungImage = (props:ImageProps)=>{
    return (
        <Image {...props}/>
    )
};

//
// const ChungImage = (props:ImageProps):ReactNode=>{
//     return (
//         <Image {...props}/>
//     )
// };
//
export default ChungImage;
