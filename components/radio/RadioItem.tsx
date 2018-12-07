import * as React from 'react';
import {RefObject} from 'react';
import {ImageStyle, StyleProp, ViewStyle} from 'react-native';
import {RadioItemPropsType} from './PropsType';
import Radio from "./Radio";
import List from "../list/List";
import Label from "../label";
import {ListItemCommonProps} from "../list/ListItem";
import Styles from "../style";
import UIContext from "../ui-provider/UIContext";


export interface RadioItemNativeProps extends RadioItemPropsType, ListItemCommonProps {
    style?: StyleProp<ViewStyle>;
    radioStyle?: StyleProp<ImageStyle>;
    label: string;
}

export default class RadioItem extends React.Component<RadioItemNativeProps> {
    private ref: RefObject<Radio>;

    public constructor(props) {
        super(props);
        this.ref = React.createRef<Radio>() as RefObject<Radio>;
    }

    public render() {
        const {style, radioStyle, defaultChecked, disableBorder, checked, label, disabled, onChange} = this.props;
        const radioEl = (
            <Radio
                ref={this.ref}
                style={radioStyle}
                defaultChecked={defaultChecked}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
        );

        return (
            <UIContext.Consumer>
                {
                    ()=>
                    <List.Item
                        disableBorder={disableBorder}
                        listItemStyle={[style,disabled && {backgroundColor:Styles.disabledBackgroundColor}]}
                        onPress={disabled ? undefined : this.handleClick}
                        extra={radioEl}>
                        <Label text={label}/>
                    </List.Item>
                }
            </UIContext.Consumer>
        );
    }

    private handleClick = () => {
        const radio: RefObject<Radio> = this.ref;
        radio.current._handleClick();
    }
}

