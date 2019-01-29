import * as React from "react"
import UIProvider from "./UIProvider";
import {ReactNode} from "react";
import Portal from "./portal/Portal";

interface ChungProviderProps {
    children: ReactNode;
}

const ChungProvider = ({children}: ChungProviderProps) =>
    <UIProvider>
        <Portal.Host>{children}</Portal.Host>
    </UIProvider>

export default ChungProvider;
