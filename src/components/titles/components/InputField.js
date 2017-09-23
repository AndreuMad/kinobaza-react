import React, { Component } from 'react';

class InputField extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onFieldChange(this.props.name, event.target.value);
    }

    render() {
        const { type, name, placeholder } = this.props;

        return (
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={this.handleChange}
            />
        );
    }
}

export default InputField;
