import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RenderInputField extends Component {
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

RenderInputField.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onFieldChange: PropTypes.func.isRequired
};

export default RenderInputField;
