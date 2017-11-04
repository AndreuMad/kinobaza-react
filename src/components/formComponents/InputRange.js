import React from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';

const RenderInputRange = ({ name, params: { min, max }, value, onFieldChange }) => (
    <InputRange
        name={name}
        minValue={min}
        maxValue={max}
        value={value}
        onChange={(value) => onFieldChange(name, value)}
    />
);

RenderInputRange.propTypes = {
    name: PropTypes.string.isRequired,
    params: PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number
    }),
    value: PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number
    }),
    onFieldChange: PropTypes.func.isRequired
};

export default RenderInputRange;
