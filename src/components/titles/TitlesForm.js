import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Scrollbars } from 'react-custom-scrollbars';

import RenderInputField from './components/InputField';
import RenderCheckboxGroup from './components/CheckboxGroup';
import RenderInputRange from './components/InputRange';

import { fetchTitles } from '../../actions/titles-actions';

class TitlesForm extends Component {
    constructor(props) {
        super(props);

        this.handleFormChange = this.handleFormChange.bind(this);

        this.state = {
            values: null
        }
    }

    componentDidMount() {
        this.props.fetchTitles();
    }

    componentDidUpdate() {
        this.props.fetchTitles(this.state.values);
    }

    handleFormChange(name, payload) {
        let data = {};
        data[name] = payload;

        this.setState({
            values: {
                ...this.state.values,
                ...data
            }
        });
    }

    render() {

        return (
            <div className="titles-filter-wrap">
                <form>
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
                            minValue={1878}
                            maxValue={2017}
                            onFieldChange={this.handleFormChange}
                        />
                    </div>
                    <div className="filter-item">
                        <p className="filter-item-title">Рейтинг IMDb</p>
                        <RenderInputRange
                            name="score"
                            minValue={1}
                            maxValue={10}
                            onFieldChange={this.handleFormChange}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

TitlesForm.propTypes = {
    fetchTitles: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
    fetchTitles: (props) => dispatch(fetchTitles(props))
});

export default connect(null, mapDispatchToProps)(TitlesForm);
