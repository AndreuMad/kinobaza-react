import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { signinUser } from 'Actions/auth-actions'
import { renderInput } from 'Components/auth/components/renderInput';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit({ email, password }) {
        this.props.signinUser(
            { email, password },
            this.props.history
        );
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops! </strong>
                    {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="login-from-wrap">
                <form
                    className="login-form"
                    onSubmit={handleSubmit(this.handleFormSubmit)}
                >
                    <Field
                        name="email"
                        component={renderInput}
                        type="text"
                        label="Email"
                    />
                    <Field
                        name="password"
                        component={renderInput}
                        type="password"
                        label="Password"
                    />
                    {this.renderAlert()}
                    <div className="btn-group">
                        <button className="btn btn-primary">Sign in</button>
                    </div>
                </form>
            </div>
        );
    }
}

SignIn.propTypes = {
    errorMessage: PropTypes.string,
    signinUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    errorMessage: state.auth.error
});

const mapDispatchToProps = (dispatch) => ({
    signinUser: (values, history) => dispatch(signinUser(values, history))
});

export default connect(mapStateToProps, mapDispatchToProps)
(reduxForm({
    form: 'signIn'
})(SignIn));
