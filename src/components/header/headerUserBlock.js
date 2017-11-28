import React, { Component } from 'react';
import AuthController from 'Components/HOC/AuthController';

import {Link} from 'react-router-dom';

const UserBlock = ({userName, signOutUser}) => {

    return (
        <div>
            <span
                key="headerUsername"
                className="username"
            >{userName}</span>
            <button
                key="headerSignoutUser"
                className="btn"
                onClick={signOutUser}
            >Sign out
            </button>
            <Link
                to="/profile"
                className="btn blue"
            >
                Редагувати
            </Link>
        </div>
    );
};

const Loader = () => (
    <span>Перевірка даних...</span>
);

const LoginButton = () => (
    <div>
        <Link
            key="headerLoginBtn"
            to="/login/sign-in"
            className="btn gradient-purple login-btn"
        >увійти</Link>
    </div>
);

export default AuthController(UserBlock, Loader, LoginButton);
