import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Scrollbars } from 'react-custom-scrollbars';

import InputField from './components/InputField';
import CheckboxGroupWrap from './components/CheckboxGroup';
import InputRangeWrap from './components/InputRange';

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
                        <InputField
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
                                <CheckboxGroupWrap
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
                        <InputRangeWrap
                            name="year"
                            minValue={1878}
                            maxValue={2017}
                            onFieldChange={this.handleFormChange}
                        />
                    </div>
                    <div className="filter-item">
                        <p className="filter-item-title">Рейтинг IMDb</p>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchTitles: (props) => dispatch(fetchTitles(props))
});

export default connect(null, mapDispatchToProps)(TitlesForm);
