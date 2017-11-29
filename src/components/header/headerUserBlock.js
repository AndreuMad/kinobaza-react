import React from 'react';
import {string, func} from 'prop-types';

import AuthController from 'Components/hoc/AuthController';

import {Link} from 'react-router-dom';

const UserBlock = ({userName, signOutUser}) => (
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

UserBlock.propTypes = {
    userName: string,
    signOutUser: func
};

export default AuthController(UserBlock, Loader, LoginButton);
