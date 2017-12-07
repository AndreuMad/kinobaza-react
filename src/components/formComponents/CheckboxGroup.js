import React from 'react';
import { string, arrayOf, func, shape } from 'prop-types';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';

const RenderCheckboxGroup = ({ name, options, onFieldChange }) => (
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
          <span className="checkbox-indicator"/>
          <span className="checkbox-name">{option.label}</span>
        </label>
      </div>
    ))}
  </CheckboxGroup>
);

RenderCheckboxGroup.propTypes = {
  name: string.isRequired,
  options: arrayOf(shape({
    name: string.isRequired,
    label: string.isRequired
  })),
  onFieldChange: func.isRequired
};

export default RenderCheckboxGroup;
