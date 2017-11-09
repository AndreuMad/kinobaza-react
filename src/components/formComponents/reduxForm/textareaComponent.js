import React from 'react';

export const textareaComponent = ({ ...field, placeholder, meta: { submitFailed, error } }) => (
    <div>
        <textarea
            rows="4"
            {...field.input}
            placeholder={placeholder}
        />
        {submitFailed && (error && <span className="error">{error}</span>) }
    </div>
);
