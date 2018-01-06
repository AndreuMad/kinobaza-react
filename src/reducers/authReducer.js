import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_STATUS,
  AUTH_ERROR,
  CHANGE_USER_DATA
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
  switch (action.type) {
    case AUTH_STATUS:
      return {
        ...state,
        status: action.status
      };
      break;

    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        error: null
      };
      break;

    case UNAUTH_USER:
      return {
        ...state,
        authenticated: false,
        error: null
      };
      break;

    case AUTH_ERROR:
      return {
        ...state,
        error: action.error
      };
      break;

    case CHANGE_USER_DATA:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user
        }
      };
      break;
  }
  return state;
};

