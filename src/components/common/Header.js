import React, { Component } from 'react';
import { Link } from 'react-router';
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
                                    <Link
                                        to="/login"
                                        className="btn gradient-purple login-btn"
                                    >увійти</Link>
                                </div>
                            </div>
                            <div className="col m-4">
                                <div className="col-inner header-control-item justify-center">
                                    <Link to='/' className="header-logo">
                                        <img src="./dist/public/img/icons/logo-film.png" alt="Kinobaza"/>
                                        <span className="header-logo-text">КіноБаза</span>
                                    </Link>
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
                        <Link
                            to='/posts'
                            className="header-navigation-link"
                            activeClassName="current"
                        >публікації</Link>
                        <Link
                            to='/titles'
                            className="header-navigation-link"
                            activeClassName="current"
                        >стрічки</Link>
                        <Link
                            to='/trailers'
                            className="header-navigation-link"
                            activeClassName="current"
                        >трейлери</Link>
                        <Link
                            to='/reviews'
                            className="header-navigation-link"
                            activeClassName="current"
                        >рецензії</Link>
                        <Link
                            to='/persons'
                            className="header-navigation-link"
                            activeClassName="current"
                        >персони</Link>
                        <Link
                            to='/lists'
                            className="header-navigation-link"
                            activeClassName="current"
                        >списки</Link>
                        <Link
                            to='/blogs'
                            className="header-navigation-link"
                            activeClassName="current"
                        >блоги</Link>
                        <Link
                            to='/forum'
                            className="header-navigation-link"
                            activeClassName="current"
                        >форум</Link>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;
