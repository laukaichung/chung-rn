import {ListItemProps} from "./ListItem";

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
    invalidMessage?:string;

}

//https://stackoverflow.com/questions/52703321/make-some-properties-optional-in-a-typescript-type
export type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>

export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
