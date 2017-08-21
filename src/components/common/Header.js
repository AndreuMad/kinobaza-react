import React from 'react';
import { Link } from 'react-router';

const Header = () => {
    return (
        <header className="main-header">
            <div className="container">
                <nav className="header-navigation">
                    <Link
                        to='/posts'
                        className="header-navigation-link"
                        activeClassName="current"
                    >публікації</Link>
                    <Link
                        to='/movies'
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
};

export default Header;
