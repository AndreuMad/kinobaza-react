import React from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';

const RenderInputRange = ({ name, params, value, onFieldChange }) => {
    return (
        <InputRange
            name={name}
            minValue={params.min}
            maxValue={params.max}
            value={value}
            onChange={(value) => onFieldChange(name, value)}
        />
    );
};

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
