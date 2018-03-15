import React, { Component } from 'react';
import { bool, string, func } from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import _ from 'lodash';
import classNames from 'classnames';

import { Container, Row, Col } from 'Components/layout';
import HeaderUserBlock from 'Components/header/HeaderUserBlock';

import { callUserSignOut } from 'Ducks/auth';

import logoImage from 'Images/icons/logo-film.png';

const headerLinks = [
  {
    key: 'headerLinkToPosts',
    to: 'posts',
    title: 'публікації',
    shouldRender: true
  },
  {
    key: 'headerLinkToTitles',
    to: 'titles',
    title: 'стрічки',
    shouldRender: true
  },
  {
    key: 'headerLinkToTrailers',
    to: 'trailers',
    title: 'трейлери',
    shouldRender: false
  },
  {
    key: 'headerLinkToReviews',
    to: 'reviews',
    title: 'рецензії',
    shouldRender: true
  },
  {
    key: 'headerLinkToPersons',
    to: 'persons',
    title: 'персони',
    shouldRender: true
  },
  {
    key: 'headerLinkToLists',
    to: 'lists',
    title: 'списки',
    shouldRender: false
  },
  {
    key: 'headerLinkToBlogs',
    to: 'blogs',
    title: 'блоги',
    shouldRender: false
  },
  {
    key: 'headerLinkToForum',
    to: 'forum',
    title: 'форум',
    shouldRender: false
  }
];

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
    const { callUserSignOut, routePush } = this.props;

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
        <Container fluid>
          <div className="header-control">
            <Row>
              <Col xs={12} md={4}>
                <div className="col-inner header-control-item">
                  <HeaderUserBlock
                    callUserSignOut={callUserSignOut}
                  />
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="col-inner header-control-item center-xs">
                  <NavLink to="/" className="header-logo">
                    <img src={logoImage} alt="Kinobaza" />
                    <span
                      key="headerLogo"
                      className="header-logo-text"
                    >
                      КіноБаза
                    </span>
                  </NavLink>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="col-inner header-control-item end-xs">
                  <form className="header-search">
                    <label className="header-search-field">
                      <input type="text" className="header-search-input" />
                      <span
                        key="headerSearchIndicator"
                        className="header-search-indicator"
                      />
                    </label>
                  </form>
                </div>
              </Col>
            </Row>
          </div>
          <nav className="header-navigation">
            {
              headerLinks.map(({
                key,
                to,
                title,
                shouldRender
              }) => (
                shouldRender && (
                  <NavLink
                    key={key}
                    to={`/${to}`}
                    className="header-navigation-link"
                    activeClassName="current"
                  >
                    {title}
                  </NavLink>
                )
              ))
            }
          </nav>
        </Container>
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

export default connect(null, mapDispatchToProps, null, { pure: false })(Header);
