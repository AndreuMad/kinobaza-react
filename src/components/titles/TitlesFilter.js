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

const renderCheckboxGroup = ({ input, options }) => (
    <div>
        {options.map((option, index) => {
            return (
                <div className="checkbox" key={`checkbox${index}`}>
                    <label>
                        <input
                            type="checkbox"
                            name={`${input.name}[${index}]`}
                            value={option.name}
                            checked={input.value.indexOf(option.name) !== -1}
                            onChange={(event) => {
                                const value = [...input.value];
                                if(event.target.checked) {
                                    value.push(option.name);
                                } else {
                                    value.splice(value.indexOf(option.name), 1);
                                }
                                return input.onChange(value);
                            }}
                        />
                        <span>{option.name}</span>
                    </label>
                </div>
            );
        })}
    </div>
);

const TitlesFilter = () => {
    return (
        <div className="titles-filter-wrap">
            <Field name="name" component="input" type="text" value="in" />
            <Field
                name="genres"
                component={renderCheckboxGroup}
                options={[
                    { name: 'action' },
                    { name: 'criminal' },
                    { name: 'drama' },
                    { name: 'adventures' },
                    { name: 'sci-fi' }
                ]}
            /><br/>
            <Field
                name="year"
                minValue={1878}
                maxValue={2017}
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
