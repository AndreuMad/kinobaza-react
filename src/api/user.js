import Axios from 'axios';

import { apiUrl } from 'Constants/urls';

export const apiSignToken = token => (
  Axios.get(`${apiUrl}/signin`, {
    headers: {
      authorization: token
    }
  })
    .then(({ data }) => data)
    .catch((error) => {
      throw (error);
    })
);

export const apiSignIn = ({ email, password }) => (
  Axios.post(`${apiUrl}/signin`, { email, password })
    .then(({ data }) => data)
    .catch((error) => {
      throw (error);
    }));

export const apiSignUp = ({ email, name, password }) => (
  Axios.post(`${apiUrl}/signup`, { email, name, password })
    .then(({ data }) => data)
    .catch((error) => {
      throw (error);
    }));
