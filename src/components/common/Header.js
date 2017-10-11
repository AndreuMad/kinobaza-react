import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import _ from 'lodash';
import classNames from 'classnames';

import { signWithToken, signoutUser } from 'Actions/auth-actions';

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleScroll = _.debounce(this.handleScroll.bind(this), 15);
        this.state = {
            sticky: false
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.singWithToken();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    singWithToken() {
        const token = localStorage.getItem('token');

        if(token) {
            this.props.signWithToken(token);
        }
    }

    renderUserBlock() {
        if(this.props.authenticated) {
            return ([
                <span
                    key="headerUsername"
                    className="username"
                >{this.props.userName}</span>,
                <button
                    key="headerSignoutUser"
                    className="btn"
                    onClick={this.props.signoutUser}
                >Sign out</button>
            ])
        } else {
            return (
                <Link
                    key="headerLoginBtn"
                    to="/login/sign-in"
                    className="btn gradient-purple login-btn"
                >увійти</Link>
            );
        }
    }

    handleScroll() {

        if(window.pageYOffset > 0) {

            if(this.state.sticky === false) {
                this.setState({
                    sticky: true
                });
            }
        } else {
            if(this.state.sticky === true) {
                this.setState({
                    sticky: false
                });
            }
        }
    }

    render() {
        return (
            <header
                className={classNames(
                    "main-header",
                    { "sticky": this.state.sticky }
                )}
            >
                <div className="container-full">
                    <div className="header-control">
                        <div className="row">
                            <div className="col m-4">
                                <div className="col-inner header-control-item">
                                    {this.renderUserBlock()}
                                </div>
                            </div>
                            <div className="col m-4">
                                <div className="col-inner header-control-item center-xs">
                                    <NavLink to='/' className="header-logo">
                                        <img src="./dist/public/img/icons/logo-film.png" alt="Kinobaza"/>
                                        <span
                                            key="headerLogo"
                                            className="header-logo-text"
                                        >КіноБаза</span>
                                    </NavLink>
                                </div>
                            </div>
                            <div className="col m-4">
                                <div className="col-inner header-control-item end-xs">
                                    <form className="header-search">
                                        <label className="header-search-field">
                                            <input type="text" className="header-search-input" />
                                            <span
                                                key="headerSearchIndicator"
                                                className="header-search-indicator" />
                                        </label>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav className="header-navigation">
                        <NavLink
                            key="headerLinkToPosts"
                            to='/posts'
                            className="header-navigation-link"
                            activeClassName="current"
                        >публікації</NavLink>
                        <NavLink
                            key="headerLinkToTitles"
                            to='/titles'
                            className="header-navigation-link"
                            activeClassName="current"
                        >стрічки</NavLink>
                        <NavLink
                            key="headerLinkToTrailers"
                            to='/trailers'
                            className="header-navigation-link"
                            activeClassName="current"
                        >трейлери</NavLink>
                        <NavLink
                            key="headerLinkToReviews"
                            to='/reviews'
                            className="header-navigation-link"
                            activeClassName="current"
                        >рецензії</NavLink>
                        <NavLink
                            key="headerLinkToPersons"
                            to='/persons'
                            className="header-navigation-link"
                            activeClassName="current"
                        >персони</NavLink>
                        <NavLink
                            key="headerLinkToLists"
                            to='/lists'
                            className="header-navigation-link"
                            activeClassName="current"
                        >списки</NavLink>
                        <NavLink
                            key="headerLinkToBlogs"
                            to='/blogs'
                            className="header-navigation-link"
                            activeClassName="current"
                        >блоги</NavLink>
                        <NavLink
                            key="headerLinkToForum"
                            to='/forum'
                            className="header-navigation-link"
                            activeClassName="current"
                        >форум</NavLink>
                    </nav>
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    authenticated: PropTypes.bool,
    userName: PropTypes.string,
    signWithToken: PropTypes.func.isRequired,
    signoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => (
    {
        authenticated: state.auth.authenticated,
        userName: state.auth.name
    }
);

const mapDispatchToProps = (dispatch) => ({
    signWithToken: (token) => dispatch(signWithToken(token)),
    signoutUser: () => dispatch(signoutUser())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
