import React from 'react';
import PropTypes from 'prop-types';

const RenderInputField = ({ type, name, placeholder, onFieldChange }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    onChange={(event) => onFieldChange(name, event.target.value)}
  />
);

RenderInputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onFieldChange: PropTypes.func.isRequired
};

export default RenderInputField;
