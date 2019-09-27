import * as React from 'react';
import {TextInput, TextInputProps} from 'react-native';
import {forwardRef, RefForwardingComponent, RefObject, useEffect, useRef} from "react";
import {useImperativeHandle} from "react";

export interface TextInputExtendedProps extends TextInputProps {
}

export interface InputPublicMethods {
    textInputRef: RefObject<TextInput>
}

const Input: RefForwardingComponent<InputPublicMethods, TextInputExtendedProps> = (props, ref) => {
    const inputRef = useRef<TextInput>();
    // useEffect(() => {
    //
    //     if(props.focused){
    //
    //     }
    //
    // }, []);

    useEffect(() => {
        if (inputRef.current && (props.autoFocus)) {
            inputRef.current.focus();
        }
    }, []);

    useImperativeHandle(ref, () => ({
        textInputRef: inputRef,
    }));

    //
    // UNSAFE_componentDidUpdate() {
    //     if (this.inputRef.current && this.props.focused) {
    //         this.inputRef.current.focus();
    //     }
    // }

    return (
        <TextInput
            ref={inputRef}
            underlineColorAndroid="transparent"
            {...props}
        />
    );
};

export default forwardRef(Input);
