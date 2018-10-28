import {ReactNode} from "react";

export interface CameraRollFile {
    uri: string;
    height: number;
    width: number;
    isStored?: boolean;
    type?: string
}

export interface TabRoute {
    title: string;
    key:string;
    render?:()=>ReactNode
}

export interface AccordionPane {
    render: () => ReactNode
    title: string
}

export type KeyboardType = 'decimal-pad' | 'phone-pad' | 'number-pad'  | 'numeric' | 'email-address' |'default' |'password' | 'bankCard'
