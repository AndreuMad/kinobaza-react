// Constants
export const CALL_AUTH_TOKEN = 'CALL_AUTH_TOKEN';
export const CALL_USER_SIGN_OUT = 'CALL_USER_SIGN_OUT';
export const CALL_USER_SIGN_IN = 'CALL_USER_SIGN_IN';
export const CALL_USER_SIGN_UP = 'CALL_USER_SIGN_UP';

export const CALL_EDIT_USER = 'CALL_EDIT_USER';
export const CALL_LOAD_AVATAR = 'CALL_LOAD_AVATAR';

const AUTH_USER = 'AUTH_USER';
const UNAUTH_USER = 'UNAUTH_USER';
const AUTH_STATUS = 'AUTH_STATUS';
const AUTH_ERROR = 'AUTH_ERROR';

const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';

const initialState = {
  authenticated: false,
  status: true,
  error: null,
  user: {
    _id: null,
    avatar: null,
    email: null,
    name: null,
    dateOfBirth: null
  }
};

// Actions
export function authTokenRequest(token) {
  return {
    type: CALL_AUTH_TOKEN,
    payload: {
      token
    }
  };
}
export function authSuccess() {
  return {
    type: AUTH_USER
  };
}

export function authStatus(status) {
  return {
    type: AUTH_STATUS,
    payload: {
      status
    }
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: {
      error
    }
  };
}

export function callUserSignIn({ email, password, history }) {
  return {
    type: CALL_USER_SIGN_IN,
    payload: {
      email,
      password,
      history
    }
  };
}

export function callUserSignUp(values, history) {
  return {
    type: CALL_USER_SIGN_UP,
    payload: {
      values,
      history
    }
  };
}

export function callUserSignOut() {
  return {
    type: CALL_USER_SIGN_OUT
  };
}

export function userSignOut() {
  return {
    type: UNAUTH_USER
  };
}

export function callEditUser({ _id, name, dateOfBirth }) {
  return {
    type: CALL_EDIT_USER,
    payload: {
      _id,
      name,
      dateOfBirth
    }
  };
}

export function editUserSuccess(user) {
  return {
    type: EDIT_USER_SUCCESS,
    payload: {
      user
    }
  };
}

export function callLoadAvatar({ _id, photo }) {
  return {
    type: CALL_LOAD_AVATAR,
    payload: {
      _id,
      photo
    }
  };
}

// Reducer
export const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_STATUS:
      return {
        ...state,
        status: payload.status
      };

    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        error: null
      };

    case UNAUTH_USER:
      return {
        ...state,
        authenticated: false,
        error: null
      };

    case AUTH_ERROR:
      return {
        ...state,
        error: payload.error
      };

    case EDIT_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload.user
        }
      };

    default:
      return state;
  }
};
