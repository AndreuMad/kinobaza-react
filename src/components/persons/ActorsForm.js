import React, { Component } from 'react';
import { string, func, bool, shape } from 'prop-types';
import { connect } from 'react-redux';

import AuthController from 'Components/hoc/AuthController';

import RenderInputField from 'Components/formComponents/InputField';

import {
  callFetchActors,
  changeActorsQuery
} from 'Actions/actors-actions';

import {
  actorsDefaultParams
} from 'Constants/searchParams';

class ActorsForm extends Component {
  constructor(props) {
    super(props);

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFetchActors = this.handleFetchActors.bind(this);

    this.state = {
      actorsParams: {
        ...actorsDefaultParams,
        userId: this.props.userId
      }
    };
  }

  componentDidMount() {
    this.handleFetchActors();
  }

  handleFormChange(name, payload) {
    this.setState({
      actorsParams: {
        ...this.state.actorsParams,
        ...{ [name]: payload }
      }
    }, () => {
      const { handleFetchActors } = this;
      const { changeActorsQuery } = this.props;
      const { actorsParams } = this.state;

      changeActorsQuery(actorsParams);
      handleFetchActors();
    });
  }

  handleFetchActors() {
    const {
      props: {
        fetchActorsStatus,
        callFetchActors
      },
      state: {
        actorsParams
      }
    } = this;

    console.log('fetch');

    if (fetchActorsStatus) {
      callFetchActors(actorsParams);
    }
  }

  render() {
    const {
      handleFormChange
    } = this;

    return (
      <div className="actors-filter-wrap">
        <form>
          <div className="filter-item">
            <RenderInputField
              type="text"
              name="name"
              placeholder="Ім'я"
              onFieldChange={handleFormChange}
            />
          </div>
        </form>
      </div>
    );
  }
}

const Loader = () => (
  <span>Перевірка даних...</span>
);

ActorsForm.propTypes = {
  authenticated: bool,
  user: shape({
    _id: string
  }),
  fetchActorsStatus: bool.isRequired,
  callFetchActors: func.isRequired,
  changeActorsQuery: func.isRequired
};

const mapStateToProps = ({ actors: { fetchActorsStatus } }) => ({
  fetchActorsStatus
});

const mapDispatchToProps = dispatch => ({
  callFetchActors: params => dispatch(callFetchActors(params)),
  changeActorsQuery: params => dispatch(changeActorsQuery(params))
});

export default AuthController(connect(mapStateToProps, mapDispatchToProps)(ActorsForm), Loader);
