import * as React from 'react'
import {Image, ImageProps} from "react-native";

// class ChungImage extends React.Component<ImageProps>{
//     render(){
//         let {props} = this;
//         return (
//             <Image {...props}/>
//         )
//     }
// }

const ChungImage = (props:ImageProps)=>{
    return (
        <Image {...props}/>
    )
};

export default ChungImage;
