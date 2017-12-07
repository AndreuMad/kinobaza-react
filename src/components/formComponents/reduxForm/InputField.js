import React from 'react';
import { string, func, bool, shape } from 'prop-types';

const InputField = ({
                      ...field,
                      type,
                      className,
                      errorClassName,
                      labelClassName,
                      placeholder,
                      initialValue,
                      meta: {
                        touched,
                        error
                      }
                    }) => (
  <label className={labelClassName}>
    <input
      {...field.input}
      className={className}
      type={type}
      placeholder={placeholder}
    />
    {(touched && error) && <span className={errorClassName}>{error}</span>}
  </label>
);

InputField.propTypes = {
  type: string,
  className: string,
  errorClassName: string,
  labelClassName: string,
  placeholder: string,
  input: shape({
    name: string.isRequired,
    onChange: func
  }),
  defaultValue: string,
  meta: shape({
    touched: bool,
    error: string
  })
};

InputField.defaultProps = {
  type: 'text',
  placeholder: '',
  initialValue: ''
};

export default InputField;
