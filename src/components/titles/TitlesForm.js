import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Scrollbars } from 'react-custom-scrollbars';

import RenderInputField from 'Components/formComponents/InputField';
import RenderCheckboxGroup from 'Components/formComponents/CheckboxGroup';
import RenderInputRange from 'Components/formComponents/InputRange';
import RenderSelectField from 'Components/formComponents/SelectField'

import {
    fetchTitles,
    changeTitlesQuery
} from 'Actions/titles-actions';

import {
    titlesDefaultParams
} from 'Constants/searchParams';

class TitlesForm extends Component {
    constructor(props) {
        super(props);

        this.handleFormChange = this.handleFormChange.bind(this);

        this.state = {
            titlesParams: {
                ...titlesDefaultParams,
                userId: this.props.userId
            }
        }
    }

    componentDidMount() {
        this.handleFetchTitles();
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.userId !== this.props.userId) {
            this.setState({
                titlesParams: {
                    ...this.state.titlesParams,
                    userId: nextProps.userId
                }
            }, () => {
                const { titlesParams } = this.state;

                this.props.changeTitlesQuery(titlesParams);
                this.handleFetchTitles();
            });
        }
    }

    handleFormChange(name, payload) {
        this.setState({
            titlesParams: {
                ...this.state.titlesParams,
                ...{ [name]: payload }
            }
        }, () => {
            const { titlesParams } = this.state;

            this.props.changeTitlesQuery(titlesParams);
            this.handleFetchTitles();
        });
    }

    handleFetchTitles() {
        if(this.props.fetchTitlesStatus) {
            const { titlesParams } = this.state;

            this.props.fetchTitles(titlesParams);
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
                            value={this.state.titlesParams.sort}
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
                                max: 2018
                            }}
                            value={this.state.titlesParams.year}
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
                            value={this.state.titlesParams.score}
                            onFieldChange={this.handleFormChange}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

TitlesForm.propTypes = {
    userId: PropTypes.string,
    fetchTitles: PropTypes.func.isRequired,
    changeTitlesQuery: PropTypes.func.isRequired,
    fetchTitlesStatus: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        userId: state.auth.id,
        fetchTitlesStatus: state.titles.fetchTitlesStatus
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchTitles: (params) => dispatch(fetchTitles(params)),
    changeTitlesQuery: (params) => dispatch(changeTitlesQuery(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(TitlesForm);
