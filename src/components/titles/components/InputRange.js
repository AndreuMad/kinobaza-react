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

    handleChange(data) {
        let value = {};

        this.setState(data);
        value[this.props.name] = data;

        return value;
    }

    render() {
        const { name, minValue, maxValue, onFieldChange } = this.props;

        return (
            <InputRange
                name={name}
                minValue={minValue}
                maxValue={maxValue}
                value={this.state.value}
                onChange={value => onFieldChange(value, this.handleChange)}
            />
        );
    }
}

export default InputRangeWrap;
