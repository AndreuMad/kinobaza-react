import Axios from 'axios';

import {
  CHANGE_USER_DATA
} from 'Constants/actions';

import { apiUrl } from 'Constants/urls';

export const changeUserData = data => ({
  type: CHANGE_USER_DATA,
  data
});

export const editUser = ({ _id, name, dateOfBirth }) => (
  (dispatch) => {
    const token = localStorage.getItem('token');
    const data = { _id };

    if (name) {
      data.name = name;
    }
    if (dateOfBirth) {
      data.dateOfBirth = dateOfBirth;
    }

    Axios.put(
      `${apiUrl}/user_edit`,
      data,
      {
        headers: {
          authorization: token
        }
      }
    )
      .then(({ data }) => dispatch(changeUserData(data)))
      .catch((error) => {
        console.log(error);
        throw (error);
      });
  });

export const loadAvatar = ({ _id, photo }) => (
  (dispatch) => {
    const token = localStorage.getItem('token');
    const data = new FormData();
    data.append('_id', _id);
    data.append('photo', photo);

    Axios.post(
      `${apiUrl}/user_avatar`,
      data,
      {
        headers: {
          authorization: token,
          'Content-Type': 'multipart/form-data'
        }
      }
    )
      .then(() => console.log('success'))
      .catch((error) => {
        console.log(error);
        throw (error);
      });
  });
