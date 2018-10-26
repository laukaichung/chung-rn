import * as React from 'react';
import {TextInput, TextInputProps} from 'react-native';

export interface TextInputExtendedProps extends TextInputProps {
    focused?: boolean;
}

class Input extends React.Component<TextInputExtendedProps, any> {
    inputRef: TextInput | null;

    constructor(props: TextInputExtendedProps) {
        super(props);

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
        if (this.inputRef && (this.props.autoFocus || this.props.focused)) {
            this.inputRef.focus();
        }
    }

    componentDidUpdate() {
        if (this.inputRef && this.props.focused) {
            this.inputRef.focus();
        }
    }

    focus = () => {
        if (this.inputRef) {
            this.inputRef.focus();
        }
    }

    clear = () => {
        if (this.inputRef) {
            this.inputRef.clear();
        }
    }

    render() {
        return (
            <TextInput
                ref={el => ((this.inputRef as any) = el)}
                underlineColorAndroid="transparent"
                {...this.props}
            />
        );
    }
}

export default Input;
