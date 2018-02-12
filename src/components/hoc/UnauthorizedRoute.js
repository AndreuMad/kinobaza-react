import React, { Component } from 'react';
import { bool, func } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class UnauthorizedRoute extends Component {
  renderRoute = (routeProps) => {
    const {
      authenticated,
      component: UnauthorizedComponent,
      status
    } = this.props;

    return status && (!authenticated ? <UnauthorizedComponent {...routeProps} /> : <Redirect to="/profile" />);
  };

  render() {
    const { component, ...rest } = this.props;

    return (
      <Route {...rest} render={this.renderRoute} />
    );
  }
}

UnauthorizedRoute.propTypes = {
  authenticated: bool.isRequired,
  component: func.isRequired,
  status: bool.isRequired
};

export default connect(state => ({
  authenticated: !!state.auth.authenticated,
  status: state.auth.status
}), null, null, { pure: false })(UnauthorizedRoute);
