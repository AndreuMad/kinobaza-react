import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_STATUS,
  AUTH_ERROR,
  EDIT_USER_SUCCESS
} from 'Constants/actions';

const defaultState = {
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

export const authReducer = (state = defaultState, action) => {
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

