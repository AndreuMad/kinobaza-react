import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            sticky: false
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll() {

        console.log('scroll');

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
                                <div className="col-inner header-control-item justify-start">
                                    <NavLink
                                        to="/login"
                                        className="btn gradient-purple login-btn"
                                    >увійти</NavLink>
                                </div>
                            </div>
                            <div className="col m-4">
                                <div className="col-inner header-control-item justify-center">
                                    <NavLink to='/' className="header-logo">
                                        <img src="./dist/public/img/icons/logo-film.png" alt="Kinobaza"/>
                                        <span className="header-logo-text">КіноБаза</span>
                                    </NavLink>
                                </div>
                            </div>
                            <div className="col m-4">
                                <div className="col-inner header-control-item justify-end">
                                    <form className="header-search">
                                        <label className="header-search-field">
                                            <input type="text" className="header-search-input" />
                                            <span className="header-search-indicator"></span>
                                        </label>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav className="header-navigation">
                        <NavLink
                            to='/posts'
                            className="header-navigation-link"
                            activeClassName="current"
                        >публікації</NavLink>
                        <NavLink
                            to='/titles'
                            className="header-navigation-link"
                            activeClassName="current"
                        >стрічки</NavLink>
                        <NavLink
                            to='/trailers'
                            className="header-navigation-link"
                            activeClassName="current"
                        >трейлери</NavLink>
                        <NavLink
                            to='/reviews'
                            className="header-navigation-link"
                            activeClassName="current"
                        >рецензії</NavLink>
                        <NavLink
                            to='/persons'
                            className="header-navigation-link"
                            activeClassName="current"
                        >персони</NavLink>
                        <NavLink
                            to='/lists'
                            className="header-navigation-link"
                            activeClassName="current"
                        >списки</NavLink>
                        <NavLink
                            to='/blogs'
                            className="header-navigation-link"
                            activeClassName="current"
                        >блоги</NavLink>
                        <NavLink
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

export default Header;
