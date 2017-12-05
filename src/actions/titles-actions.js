import Axios from 'axios';

import {
  FETCH_TITLES_STATUS,
  FETCH_TITLES_SUCCESS,
  FETCH_UP_TITLES_SUCCESS,
  CLEAR_TITLES,
  FETCH_TITLE_SUCCESS
} from 'Constants/actions'

import { apiUrl } from 'Constants/urls';

export const fetchTitlesStatus = status => ({
  type: FETCH_TITLES_STATUS,
  status
});

export const fetchTitlesSuccess = ({ count, titles }) => ({
  type: FETCH_TITLES_SUCCESS,
  titlesData: {
    count,
    titles
  }
});

export const fetchUpTitlesSuccess = titles => ({
  type: FETCH_UP_TITLES_SUCCESS,
  titlesData: {
    titles
  }
});

export const clearTitles = () => ({
  type: CLEAR_TITLES
});

export const fetchTitles = (params, appendTitles) => (
  (dispatch) => {
    dispatch(fetchTitlesStatus(false));

    return Axios.get(`${apiUrl}/titles`, {
      params: {
        ...params
      }
    })
      .then((response) => {
        const { count, titles } = response.data;

        if (appendTitles) {
          dispatch(fetchUpTitlesSuccess(titles));
        } else {
          dispatch(fetchTitlesSuccess({ count, titles }));
        }

        dispatch(fetchTitlesStatus(true));
      })
      .catch((error) => {
        throw (error);
      });
  });

export const setTitleRating = (userId, titleId, rating) => (
  dispatch => (
    Axios.post(`${apiUrl}/titles/rate`, { userId, titleId, rating })
      .then((response) => {

      })
      .catch((error) => {
        throw (error);
      }))
);
