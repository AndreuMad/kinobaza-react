import Axios from 'axios';
import { apiUrl } from 'Constants/urls';

export const apiFetchTitles = params => (
  Axios.get(`${apiUrl}/titles`, {
    params
  })
    .then(({ data }) => data)
    .catch((error) => {
      throw (error);
    })
);

export const apiSetTitleRating = ({ userId, titleId, rating }) => (
  Axios.post(`${apiUrl}/titles/rate`, { userId, titleId, rating })
    .then(response => response)
    .catch((error) => {
      throw (error);
    })
);
