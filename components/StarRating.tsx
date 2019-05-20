import * as React from "react"
import Icon from "./Icon";
import {View} from "react-native";

interface Props {
    rating: number;
    maxRating?: number
    onChange: (rating: number)=> void;
    starSize?: number
}
const StarRating = ({rating, maxRating = 10, starSize = 24, onChange}: Props)=>{
    let elements: any[] = [];
    for(let x = 1; x <= maxRating; x++){
        elements.push(
            <Icon
                customSize={starSize}
                style={{marginRight: 10}}
                key={x}
                color={x <= rating ? "orange": null}
                name={"star"}
                onPress={() => {
                    onChange(rating === 1 && x === 1 ? 0: x);
                }}
            />
        )
    }

    return (
        <View style={{flex: 1, flexDirection: "row"}}>
            {elements}
        </View>
    )
};

export default StarRating;