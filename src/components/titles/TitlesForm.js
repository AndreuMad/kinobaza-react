import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Scrollbars } from 'react-custom-scrollbars';

import RenderInputField from 'Components/titles/components/InputField';
import RenderCheckboxGroup from 'Components/titles/components/CheckboxGroup';
import RenderInputRange from 'Components/titles/components/InputRange';
import RenderSelectField from 'Components/titles/components/SelectField'

import {
    fetchTitles,
    changeTitlesParams
} from '../../actions/titles-actions';

class TitlesForm extends Component {
    constructor(props) {
        super(props);

        this.handleFormChange = this.handleFormChange.bind(this);

        this.state = {
            titlesParams: {
                name: '',
                genre: [],
                year: {
                    min: 1878,
                    max: 2017
                },
                score: {
                    min: 1,
                    max: 10
                }
            }
        }
    }

    componentDidMount() {
        this.props.fetchTitles();
    }

    handleFormChange(name, payload) {

        if(this.props.fetchTitlesStatus) {
            this.setState({
                titlesParams: {
                    ...this.state.titlesParams,
                    ...{ [name]: payload }
                }
            }, () => {
                const { titlesParams } = this.state;

                this.props.changeTitlesParams(titlesParams);
                this.props.fetchTitles(titlesParams);
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
                            value="name.ukr"
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
                            values={{
                                min: 1878,
                                max: 2017
                            }}
                            onFieldChange={this.handleFormChange}
                        />
                    </div>
                    <div className="filter-item">
                        <p className="filter-item-title">Рейтинг IMDb</p>
                        <RenderInputRange
                            name="score"
                            values={{
                                min: 1,
                                max: 10
                            }}
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
    changeTitlesParams: PropTypes.func.isRequired,
    fetchTitlesStatus: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        titlesYear: state.titles.year,
        fetchTitlesStatus: state.titles.fetchTitlesStatus
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchTitles: (params) => dispatch(fetchTitles(params)),
    changeTitlesParams: (params) => dispatch(changeTitlesParams(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(TitlesForm);
