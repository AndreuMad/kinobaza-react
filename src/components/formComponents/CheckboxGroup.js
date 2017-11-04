import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';

const RenderCheckboxGroup = ({ name, options, onFieldChange}) => (
    <CheckboxGroup
        name={name}
        onChange={(values) => onFieldChange(name, values)}
    >
        {options.map((option, index) => (
        <div className="checkbox-item" key={`checkbox${index}`}>
            <label className="checkbox-wrap">
                <Checkbox
                    className="checkbox-input"
                    value={option.name}
                />
                <span className="checkbox-indicator" />
                <span className="checkbox-name">{option.label}</span>
            </label>
        </div>
        ))}
    </CheckboxGroup>
);

RenderCheckboxGroup.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    })),
    onFieldChange: PropTypes.func.isRequired
};

export default RenderCheckboxGroup;
