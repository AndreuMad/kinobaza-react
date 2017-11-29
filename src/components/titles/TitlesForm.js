import React from 'react';
import {string, bool, func, shape, number} from 'prop-types';

import {Scrollbars} from 'react-custom-scrollbars';

import RenderInputField from 'Components/formComponents/InputField';
import RenderCheckboxGroup from 'Components/formComponents/CheckboxGroup';
import RenderInputRange from 'Components/formComponents/InputRange';
import RenderSelectField from 'Components/formComponents/SelectField'

const TitlesForm = ({
                        query: {
                            sort: sortTitlesBy,
                            year: titlesYear,
                            score: titlesScore
                        },
                        handleQueryChange
                    }) => (
    <div className="titles-filter-wrap">
        <form>
            <div className="filter-item">
                <RenderSelectField
                    name="sort"
                    options={[
                        {label: 'назва укр', value: 'name.ukr'},
                        {label: 'назва англ', value: 'name.en'},
                        {label: 'рік', value: 'year'},
                        {label: 'рейтинг', value: 'score'},
                    ]}
                    value={sortTitlesBy}
                    onFieldChange={handleQueryChange}
                />
            </div>
            <div className="filter-item">
                <RenderInputField
                    type="text"
                    name="name"
                    placeholder="назва"
                    onFieldChange={handleQueryChange}
                />
            </div>
            <div className="filter-item">
                <div className="genres-wrap">
                    <Scrollbars style={{
                        height: '16rem'
                    }}>
                        <RenderCheckboxGroup
                            name="genre"
                            options={[
                                {name: 'action', label: 'екшн'},
                                {name: 'criminal', label: 'кримінальний'},
                                {name: 'drama', label: 'драма'},
                                {name: 'adventures', label: 'пригоди'},
                                {name: 'sci-fi', label: 'наукова фантастика'},
                                {name: 'fantasy', label: 'фентезі'},
                                {name: 'thriller', label: 'триллер'},
                                {name: 'comedy', label: 'комедія'}
                            ]}
                            onFieldChange={handleQueryChange}
                        />
                    </Scrollbars>
                </div>
            </div>
            <div className="filter-item">
                <p className="filter-item-title">Рік</p>
                <RenderInputRange
                    name="year"
                    params={{
                        min: 1878,
                        max: 2018
                    }}
                    value={titlesYear}
                    onFieldChange={handleQueryChange}
                />
            </div>
            <div className="filter-item">
                <p className="filter-item-title">Рейтинг IMDb</p>
                <RenderInputRange
                    name="score"
                    params={{
                        min: 1,
                        max: 10
                    }}
                    value={titlesScore}
                    onFieldChange={handleQueryChange}
                />
            </div>
        </form>
    </div>
);

TitlesForm.propTypes = {
    query: shape({
        sort: string,
        year: shape({
            max: number,
            min: number
        }),
        score: shape({
            max: number,
            min: number
        })
    }),
    handleQueryChange: func.isRequired,
};

export default TitlesForm;
