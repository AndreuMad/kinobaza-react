import React, { Component } from 'react';
import InputRange from 'react-input-range';

class InputRangeWrap extends Component {
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

export default InputRangeWrap;
