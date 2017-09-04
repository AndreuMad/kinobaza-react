import React from 'react';
import { Field, reduxForm } from 'redux-form';
import InputRange from 'react-input-range';
import { Scrollbars } from 'react-custom-scrollbars';

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
    <div className="checkbox-group-wrap">
        {options.map((option, index) => {
            return (
                <div className="checkbox-item" key={`checkbox${index}`}>
                    <label className="checkbox-wrap">
                        <input
                            type="checkbox"
                            className="checkbox-input"
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
                        <span className="checkbox-indicator"></span>
                        <span className="checkbox-name">{option.nameUkr}</span>
                    </label>
                </div>
            );
        })}
    </div>
);

const TitlesFilter = () => {
    return (
        <div className="titles-filter-wrap">
            <div className="filter-item">
                <Field name="name" component="input" type="text" value="in" placeholder="назва" />
            </div>
            <div className="filter-item">
                <div className="genres-wrap">
                    <p className="filter-item-title">Жанри</p>
                    <Scrollbars style={{
                        height: '16rem'
                    }}>
                        <Field
                            name="genres"
                            component={renderCheckboxGroup}
                            options={[
                                { name: 'action', nameUkr: 'екшн' },
                                { name: 'criminal', nameUkr: 'кримінальний' },
                                { name: 'drama', nameUkr: 'драма' },
                                { name: 'adventures', nameUkr: 'пригоди' },
                                { name: 'sci-fi', nameUkr: 'наукова фантастика' },
                                { name: 'action1', nameUkr: 'екшн' },
                                { name: 'criminal1', nameUkr: 'кримінальний' },
                                { name: 'drama1', nameUkr: 'драма' },
                                { name: 'adventures1', nameUkr: 'пригоди' },
                                { name: 'sci-fi1', nameUkr: 'наукова фантастика' }
                            ]}
                        />
                    </Scrollbars>
                </div>
            </div>
            <div className="filter-item">
                <p className="filter-item-title">Рік</p>
                <Field
                    name="year"
                    minValue={1878}
                    maxValue={2017}
                    component={renderInputRange}
                />
            </div>
            <div className="filter-item">
                <p className="filter-item-title">Рейтинг IMDb</p>
                <Field
                    name="rating"
                    minValue={1}
                    maxValue={10}
                    component={renderInputRange}
                />
            </div>
        </div>
    );
};

export default reduxForm({
    form: 'titlesFilter',
    initialValues: {
        year: {
            min: 1878,
            max: 2017
        },
        rating: {
            min: 1,
            max: 10
        }
    }
})(TitlesFilter);
