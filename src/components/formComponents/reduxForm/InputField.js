import React from 'react';
import { string, func, shape } from 'prop-types';

const InputField = ({
                        type,
                        placeholder,
                        defaultValue,
                        input: {
                            name,
                            onChange
                        }
                    }) => (
    <label>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={({ target: { value } }) => onChange(value)}
        />
    </label>
);

InputField.propTypes = {
    type: string,
    placeholder: string,
    input:  shape({
        name: string.isRequired,
        onChange: func
    }),
    initialValue: string
};

InputField.defaultProps = {
    type: 'text',
    placeholder: '',
    initialValue: ''
};

export default InputField;
