import Axios from 'axios';

import { apiUrl } from 'Constants/urls';

export function apiSignToken(token) {
  return Axios.get(`${apiUrl}/signin`, {
    headers: {
      authorization: token
    }
  })
    .then(({ data }) => data)
    .catch((error) => {
      throw (error);
    });
}

export function apiSignIn({ email, password }) {
  return Axios.post(`${apiUrl}/signin`, { email, password })
    .then(({ data }) => data)
    .catch((error) => {
      throw (error);
    });
}

export function apiSignUp({ email, name, password }) {
  return Axios.post(`${apiUrl}/signup`, { email, name, password })
    .then(({ data }) => data)
    .catch((error) => {
      throw (error);
    });
}

export function apiEditUser({ _id, name, dateOfBirth }) {
  const token = localStorage.getItem('token');
  const data = { _id };

  if (name) {
    data.name = name;
  }
  if (dateOfBirth) {
    data.dateOfBirth = dateOfBirth;
  }

  return Axios.put(
    `${apiUrl}/user_edit`,
    data,
    {
      headers: {
        authorization: token
      }
    }
  )
    .then(({ data }) => data)
    .catch((error) => {
      console.log(error);
      throw (error);
    });
}

export function apiEditAvatar({ _id, photo }) {
  const token = localStorage.getItem('token');
  const data = new FormData();

  data.append('_id', _id);
  data.append('photo', photo);

  return Axios.post(
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
}
