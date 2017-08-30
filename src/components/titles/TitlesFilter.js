import React from 'react';
import { Field, reduxForm } from 'redux-form';
import InputRange from 'react-input-range';

const renderInputRange = ({ input, minValue, maxValue }) => {

    return (
        <InputRange
            onChange={(values) => input.onChange(values)}
            value={input.value}
            minValue={minValue}
            maxValue={maxValue}
        />
    );
};

const TitlesFilter = () => {
    return (
        <div className="titles-filter-wrap">
            <Field name="name" component="input" type="text" value="in" />
            <Field
                name="year"
                maxValue={2017}
                minValue={1878}
                component={renderInputRange}
            />
        </div>
    );
};

export default reduxForm({
    form: 'titlesFilter',
    initialValues: {
        year: {
            min: 1878,
            max: 2017
        }
    }
})(TitlesFilter);
