import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Scrollbars } from 'react-custom-scrollbars';

import RenderInputField from 'Components/titles/formComponents/InputField';
import RenderCheckboxGroup from 'Components/titles/formComponents/CheckboxGroup';
import RenderInputRange from 'Components/titles/formComponents/InputRange';
import RenderSelectField from 'Components/titles/formComponents/SelectField'

import {
    fetchTitles,
    changeTitlesQuery
} from 'Actions/titles-actions';

class TitlesForm extends Component {
    constructor(props) {
        super(props);

        this.handleFormChange = this.handleFormChange.bind(this);

        this.state = {
            titlesQuery: {
                name: '',
                genre: [],
                year: {
                    min: 1878,
                    max: 2017
                },
                score: {
                    min: 1,
                    max: 10
                },
                sort: 'name.ukr'
            },
        }
    }

    componentDidMount() {
        this.props.fetchTitles();
    }

    handleFormChange(name, payload) {

        if(this.props.fetchTitlesStatus) {
            this.setState({
                titlesQuery: {
                    ...this.state.titlesQuery,
                    ...{ [name]: payload }
                }
            }, () => {
                const { titlesQuery } = this.state;

                this.props.changeTitlesQuery(titlesQuery);
                this.props.fetchTitles(titlesQuery);
            });
        }
    }

    render() {

        return (
            <div className="titles-filter-wrap">
                <form>
                    <div className="filter-item">
                        <RenderSelectField
                            name="sort"
                            options={[
                                { label: 'назва укр', value: 'name.ukr' },
                                { label: 'назва англ', value: 'name.en' },
                                { label: 'рік', value: 'year' },
                                { label: 'рейтинг', value: 'score' },
                            ]}
                            value={this.state.titlesQuery.sort}
                            onFieldChange={this.handleFormChange}
                        />
                    </div>
                    <div className="filter-item">
                        <RenderInputField
                            type="text"
                            name="name"
                            placeholder="назва"
                            onFieldChange={this.handleFormChange}
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
                                        { name: 'action', label: 'екшн' },
                                        { name: 'criminal', label: 'кримінальний' },
                                        { name: 'drama', label: 'драма' },
                                        { name: 'adventures', label: 'пригоди' },
                                        { name: 'sci-fi', label: 'наукова фантастика' },
                                        { name: 'fantasy', label: 'фентезі' },
                                        { name: 'thriller', label: 'триллер' },
                                        { name: 'comedy', label: 'комедія' }
                                    ]}
                                    onFieldChange={this.handleFormChange}
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
                                max: 2017
                            }}
                            value={this.state.titlesQuery.year}
                            onFieldChange={this.handleFormChange}
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
                            value={this.state.titlesQuery.score}
                            onFieldChange={this.handleFormChange}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

TitlesForm.propTypes = {
    fetchTitles: PropTypes.func.isRequired,
    changeTitlesQuery: PropTypes.func.isRequired,
    fetchTitlesStatus: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        fetchTitlesStatus: state.titles.fetchTitlesStatus
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchTitles: (params) => dispatch(fetchTitles(params)),
    changeTitlesQuery: (params) => dispatch(changeTitlesQuery(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(TitlesForm);
