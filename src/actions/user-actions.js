import Axios from 'axios';

import {
  CALL_EDIT_USER,
  EDIT_USER_SUCCESS,
  CALL_LOAD_AVATAR
} from 'Constants/actions';

import { apiUrl } from 'Constants/urls';

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
