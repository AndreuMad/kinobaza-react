import React from 'react';

export const renderInput = ({ label, ...field, meta: { touched, error } }) => {
    return (
        <fieldset className="form-group">
            <label>{label}</label>
            <input
                {...field.input}
                type={field.type ? field.type : 'text'}
                className="form-control"/>
            {touched && (error && <span className="field-error">{error}</span>)}
        </fieldset>
    );
};
