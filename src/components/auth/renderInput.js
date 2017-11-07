import React from 'react';

export const renderInput = ({ placeholder, ...field, meta: { touched, error } }) => (
    <div className="auth-body-field">
        <input
            {...field.input}
            type={field.type ? field.type : 'text'}
            placeholder={placeholder}
            className="auth-body-input"/>
        {touched && (error && <span className="field-error">{error}</span>)}
    </div>
);
