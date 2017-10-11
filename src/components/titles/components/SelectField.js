import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class RenderSelectField extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: this.props.name
        };
    }

    handleChange({ value }) {
        this.setState({ value });
        this.props.onFieldChange(this.props.name, value);
    }

    render() {

        return (
            <Select
                name={this.props.name}
                value={this.state.value}
                options={[
                    { label: 'назва укр', value: 'name.ukr' },
                    { label: 'назва англ', value: 'name.en' },
                    { label: 'рік', value: 'year' },
                    { label: 'рейтинг', value: 'score' },
                ]}
                onChange={this.handleChange}
            />
        )
    }
}

RenderSelectField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onFieldChange: PropTypes.func.isRequired
};

export default RenderSelectField;
