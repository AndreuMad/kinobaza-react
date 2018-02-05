import React from 'react';
import { string, func, shape } from 'prop-types';

import AuthController from 'Components/hoc/AuthController';

import { Link } from 'react-router-dom';

const UserBlock = ({ user: { name }, callUserSignOut }) => (
  <div>
        <span
          key="headerUsername"
          className="username"
        >{name}</span>
    <button
      key="headerSignoutUser"
      className="btn"
      onClick={callUserSignOut}
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
  user: shape({
    name: string
  }),
  callUserSignOut: func.isRequired
};

UserBlock.defaultProps = {
  user: {
    name: ''
  }
};

export default AuthController(UserBlock, Loader, LoginButton);
