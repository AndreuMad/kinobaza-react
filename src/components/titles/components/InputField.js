import React, { Component } from 'react';

class InputField extends Component {
    handleChange(event) {
        let value = {};
        value[event.target.name] = event.target.value.toLowerCase();

        return value;
    }

    render() {
        const { type, name, placeholder, onFieldChange } = this.props;

        return (
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={(event) => onFieldChange(event, this.handleChange)}
            />
        );
    }
}

export default InputField;
