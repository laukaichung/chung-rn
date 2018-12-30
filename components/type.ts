import {ListItemProps} from "./list/ListItem";

export interface CameraRollFile {
    uri: string;
    height: number;
    width: number;
    isStored?: boolean;
    type?: string
}

export interface FormListItemCommonProps {
    listItemProps?:ListItemProps
}

export interface FormCommonProps {
    hint?:string;
    label:string;

}
