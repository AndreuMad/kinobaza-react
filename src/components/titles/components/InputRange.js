import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';

class RenderInputRange extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: { min: this.props.minValue, max: this.props.maxValue },
        };
    }

    handleChange(value) {
        this.setState({ value });
        this.props.onFieldChange(this.props.name, value);
    }

    render() {
        const { name, minValue, maxValue } = this.props;

        return (
            <InputRange
                name={name}
                minValue={minValue}
                maxValue={maxValue}
                value={this.state.value}
                onChange={(value) => this.handleChange(value)}
            />
        );
    }
}

RenderInputRange.propTypes = {
    name: PropTypes.string.isRequired,
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    onFieldChange: PropTypes.func.isRequired
};

export default RenderInputRange;
