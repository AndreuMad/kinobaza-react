import React, { Component } from 'react';
import { bool, element } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class ProtectedRoute extends Component {
  renderProtected = (routeProps) => {
    const {
      authenticated,
      component: ProtectedComponent,
    } = this.props;

    return authenticated ? <ProtectedComponent {...routeProps} /> : <Redirect to="login/sign-in" />;
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
  component: element.isRequired
};

export default connect(state => ({
  authenticated: !!state.auth.authenticated
}), null, null, { pure: false })(ProtectedRoute);
