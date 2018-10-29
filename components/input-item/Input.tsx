import * as React from 'react';
import {TextInput, TextInputProps} from 'react-native';
import {RefObject} from "react";

export interface TextInputExtendedProps extends TextInputProps {
    focused?: boolean;
}

class Input extends React.Component<TextInputExtendedProps, any> {
    inputRef: RefObject<TextInput>;

    constructor(props: TextInputExtendedProps) {
        super(props);
        this.inputRef = React.createRef();
        // todos: remove focused in next major version.
        this.state = {
            focused: props.focused || false,
        };
    }

    componentWillReceiveProps(nextProps: TextInputExtendedProps) {
        if (nextProps.focused !== this.state.focused) {
            this.setState({
                focused: nextProps.focused,
            });
        }
    }

    componentDidMount() {
        if (this.inputRef.current && (this.props.autoFocus || this.props.focused)) {
            this.inputRef.current.focus();
        }
    }

    componentDidUpdate() {
        if (this.inputRef.current && this.props.focused) {
            this.inputRef.current.focus();
        }
    }

    focus = () => {
        if (this.inputRef) {
            this.inputRef.current.focus();
        }
    }

    clear = () => {
        if (this.inputRef) {
            this.inputRef.current.clear();
        }
    }

    render() {
        return (
            <TextInput
                ref={this.inputRef}
                underlineColorAndroid="transparent"
                {...this.props}
            />
        );
    }
}

export default Input;
