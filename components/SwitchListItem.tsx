import * as React from "react"
import {ListItem} from "./index";
import {Switch} from "react-native";
import Label from "./CheckboxListItem";
import Styles from "./Styles";

export interface SwitchListItemProps {

}


// export default class SwitchListItem extends React.Component<SwitchListItemProps> {
//
//     render() {
//
//         const {
//             style,
//             checkboxStyle,
//             defaultChecked,
//             checked,
//             disabled,
//             label,
//             invalidMessage,
//             extra,
//             listItemProps = {},
//             onChange,
//         } = this.props;
//
//         return (
//             <ListItem
//                 {...listItemProps}
//                 bottomExtraView={<FormInvalidHint invalidMessage={invalidMessage}/>}
//                 style={[style, disabled && {backgroundColor: Styles.disabledBackgroundColor}]}
//                 onPress={disabled ? undefined : this._handleClick}
//                 extra={(
//                     <Switch onValueChange={} value={}/>
//                 )}
//             >
//                 <Label style={disabled && {color:Styles.disabledTextColor}}>{label}</Label>
//                 {extra}
//             </ListItem>
//         )
//     }
// }