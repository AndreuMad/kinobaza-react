import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RenderInputField from 'Components/formComponents/InputField';

import {
    fetchActors,
    changeActorsQuery
} from 'Actions/actors-actions';

import {
    actorsDefaultParams
} from 'Constants/searchParams';

class ActorsForm extends Component {
    constructor(props) {
        super(props);

        this.handleFormChange = this.handleFormChange.bind(this);

        this.state = {
            actorsParams: {
                ...actorsDefaultParams,
                userId: this.props.userId
            }
        }
    }

    componentDidMount() {
        this.handleFetchActors();
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.userId !== this.props.userId) {
            this.setState({
                actorsParams: {
                    ...this.state.actorsParams,
                    userId: nextProps.userId
                }
            }, () => {
                this.handleFetchActors();
            });
        }
    }

    handleFormChange(name, payload) {
        this.setState({
            actorsParams: {
                ...this.state.actorsParams,
                ...{ [name]: payload }
            }
        }, () => {
            const { actorsParams } = this.state;

            this.props.changeActorsQuery(actorsParams);
            this.handleFetchActors();
        });
    }

    handleFetchActors() {
        if(this.props.fetchActorsStatus) {
            const { actorsParams } = this.state;

            this.props.fetchActors(actorsParams);
        }
    }

    render() {

        return (
            <div className="actors-filter-wrap">
                <form>
                    <div className="filter-item">
                        <RenderInputField
                            type="text"
                            name="name"
                            placeholder="Ім'я"
                            onFieldChange={this.handleFormChange}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

ActorsForm.propTypes = {
    userId: PropTypes.string,
    fetchActors: PropTypes.func.isRequired,
    changeActorsQuery: PropTypes.func.isRequired,
    fetchActorsStatus: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        userId: state.auth.id,
        fetchActorsStatus: state.actors.fetchActorsStatus
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchActors: (params) => dispatch(fetchActors(params)),
    changeActorsQuery: (params) => dispatch(changeActorsQuery(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(ActorsForm);
