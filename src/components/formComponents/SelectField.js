import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const RenderSelectField= ({ name, value, options, onFieldChange }) => (
    <Select
        name={name}
        value={value}
        options={options}
        onChange={(value) => onFieldChange(name, value.value)}
    />
);

RenderSelectField.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    })),
    value: PropTypes.string.isRequired,
    onFieldChange: PropTypes.func.isRequired
};

export default RenderSelectField;
