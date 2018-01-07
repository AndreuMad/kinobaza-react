import React, { Component } from 'react';
import { bool, string, func } from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import _ from 'lodash';
import classNames from 'classnames';

import HeaderUserBlock from './headerUserBlock';

import { callUserSignOut } from 'Actions/auth-actions';

import logoImage from 'Images/icons/logo-film.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = _.debounce(this.handleScroll, 15);
    this.state = {
      sticky: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { sticky } = this.state;

    if (window.pageYOffset > 0) {
      if (sticky === false) {
        this.setState({
          sticky: true
        });
      }
    } else {
      if (sticky === true) {
        this.setState({
          sticky: false
        });
      }
    }
  };

  render() {
    const { callUserSignOut } = this.props;

    const {
      sticky
    } = this.state;

    return (
      <header
        className={classNames(
          'main-header',
          { sticky },
        )}
      >
        <div className="container-full">
          <div className="header-control">
            <div className="row">
              <div className="col m-4">
                <div className="col-inner header-control-item">
                  <HeaderUserBlock
                    callUserSignOut={callUserSignOut}
                  />
                </div>
              </div>
              <div className="col m-4">
                <div className="col-inner header-control-item center-xs">
                  <NavLink to="/" className="header-logo">
                    <img src={logoImage} alt="Kinobaza"/>
                    <span
                      key="headerLogo"
                      className="header-logo-text"
                    >
                      КіноБаза
                    </span>
                  </NavLink>
                </div>
              </div>
              <div className="col m-4">
                <div className="col-inner header-control-item end-xs">
                  <form className="header-search">
                    <label className="header-search-field">
                      <input type="text" className="header-search-input"/>
                      <span
                        key="headerSearchIndicator"
                        className="header-search-indicator"/>
                    </label>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <nav className="header-navigation">
            <NavLink
              key="headerLinkToPosts"
              to="/posts"
              className="header-navigation-link"
              activeClassName="current"
            >
              публікації
            </NavLink>
            <NavLink
              key="headerLinkToTitles"
              to="/titles"
              className="header-navigation-link"
              activeClassName="current"
            >
              стрічки
            </NavLink>
            <NavLink
              key="headerLinkToTrailers"
              to="/trailers"
              className="header-navigation-link"
              activeClassName="current"
            >
              трейлери
            </NavLink>
            <NavLink
              key="headerLinkToReviews"
              to="/reviews"
              className="header-navigation-link"
              activeClassName="current"
            >
              рецензії
            </NavLink>
            <NavLink
              key="headerLinkToPersons"
              to="/persons"
              className="header-navigation-link"
              activeClassName="current"
            >
              персони
            </NavLink>
            <NavLink
              key="headerLinkToLists"
              to="/lists"
              className="header-navigation-link"
              activeClassName="current"
            >
              списки
            </NavLink>
            <NavLink
              key="headerLinkToBlogs"
              to="/blogs"
              className="header-navigation-link"
              activeClassName="current"
            >
              блоги
            </NavLink>
            <NavLink
              key="headerLinkToForum"
              to="/forum"
              className="header-navigation-link"
              activeClassName="current"
            >
              форум
            </NavLink>
          </nav>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  authenticated: bool,
  userName: string,
  callUserSignOut: func.isRequired
};

const mapDispatchToProps = dispatch => ({
  callUserSignOut: () => dispatch(callUserSignOut())
});

export default withRouter(connect(null, mapDispatchToProps)(Header));
