import Axios from 'axios';
import { apiUrl } from 'Constants/urls';

export function apiFetchTitles(params) {
  return Axios.get(`${apiUrl}/titles`, {
    params
  })
    .then(({ data }) => data)
    .catch((error) => {
      throw (error);
    });
}

export function apiSetTitleRating({ userId, titleId, rating }) {
  return Axios.post(`${apiUrl}/titles/rate`, { userId, titleId, rating })
    .then(response => response)
    .catch((error) => {
      throw (error);
    });
}
