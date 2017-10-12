import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';

class RenderInputRange extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: { min: this.props.values.min, max: this.props.values.max },
        };
    }

    handleChange(value) {
        console.log(value);
        this.setState({ value });
        this.props.onFieldChange(this.props.name, value);
    }

    render() {
        const { name } = this.props;
        const { min, max } = this.props.values;

        return (
            <InputRange
                name={name}
                minValue={min}
                maxValue={max}
                value={this.state.value}
                onChange={(value) => this.handleChange(value)}
            />
        );
    }
}

RenderInputRange.propTypes = {
    name: PropTypes.string.isRequired,
    values: PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number
    }),
    onFieldChange: PropTypes.func.isRequired
};

export default RenderInputRange;
