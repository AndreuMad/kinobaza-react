import React, { Component } from 'react';
import { bool, func } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class ProtectedRoute extends Component {
  renderProtected = (routeProps) => {
    const {
      authenticated,
      component: ProtectedComponent,
      status
    } = this.props;

    return status && (authenticated ? <ProtectedComponent {...routeProps} /> : <Redirect to="login/sign-in" />);
  };

  render() {
    const { component, ...rest } = this.props;

    return (
      <Route {...rest} render={this.renderProtected} />
    );
  }
}

ProtectedRoute.propTypes = {
  authenticated: bool.isRequired,
  component: func.isRequired,
  status: bool.isRequired
};

export default connect(state => ({
  authenticated: !!state.auth.authenticated,
  status: state.auth.status
}), null, null, { pure: false })(ProtectedRoute);
