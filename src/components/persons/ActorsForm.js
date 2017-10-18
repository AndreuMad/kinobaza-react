import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RenderInputField from 'Components/formComponents/InputField';

import {
    fetchActors,
    changeActorsQuery
} from 'Actions/actors-actions';

class ActorsForm extends Component {

};

ActorsForm.propTypes = {
    fetchActors: PropTypes.func.isRequired,
    changeActorsQuery: PropTypes.func.isRequired,
    fetchActorsStatus: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        fetchActorsStatus: state.titles.fetchActorsStatus
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchActors: (params) => dispatch(fetchActors(params)),
    changeActorsQuery: (params) => dispatch(changeActorsQuery(params))
});

export default connect(mapStateToProps)(ActorsForm);
