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
        this.handleFetchTitles = this.handleFetchTitles.bind(this);

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

    componentWillReceiveProps({ userId: nextUserId }) {
        const{
            userId: currentUserId
        } = this.props;

        if(nextUserId !== currentUserId) {
            const {
                handleFetchTitles
            } = this;

            const {
                changeTitlesQuery
            } = this.props;

            this.setState({
                titlesParams: {
                    ...this.state.titlesParams,
                    userId: nextUserId
                }
            }, () => {
                const { titlesParams } = this.state;

                changeTitlesQuery(titlesParams);
                handleFetchTitles();
            });
        }
    }

    handleFormChange(name, payload) {
        const {
            handleFetchTitles
        } = this;

        const {
            changeTitlesQuery
        } = this.props;

        this.setState({
            titlesParams: {
                ...this.state.titlesParams,
                ...{ [name]: payload }
            }
        }, () => {
            const { titlesParams } = this.state;

            changeTitlesQuery(titlesParams);
            handleFetchTitles();
        });
    }

    handleFetchTitles() {
        const {
            fetchTitlesStatus,
            fetchTitles
        } = this.props;

        if(fetchTitlesStatus) {
            const { titlesParams } = this.state;

            fetchTitles(titlesParams);
        }
    }

    render() {
        const {
            handleFormChange
        } = this;

        const {
            titlesParams: {
                sort: sortTitlesBy,
                year: titlesYear,
                score: titlesScore
            }
        } = this.state;

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
                            value={sortTitlesBy}
                            onFieldChange={handleFormChange}
                        />
                    </div>
                    <div className="filter-item">
                        <RenderInputField
                            type="text"
                            name="name"
                            placeholder="назва"
                            onFieldChange={handleFormChange}
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
                                    onFieldChange={handleFormChange}
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
                            onFieldChange={handleFormChange}
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
                            onFieldChange={handleFormChange}
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

const mapStateToProps = ({
    auth: { id: userId },
    titles: { fetchTitlesStatus }
}) => ({
    userId,
    fetchTitlesStatus
});

const mapDispatchToProps = (dispatch) => ({
    fetchTitles: (params) => dispatch(fetchTitles(params)),
    changeTitlesQuery: (params) => dispatch(changeTitlesQuery(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(TitlesForm);
