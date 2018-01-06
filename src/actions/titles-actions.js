import Axios from 'axios';

import {
  CALL_FETCH_TITLES,
  CALL_SET_TITLE_RATING,
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

export const callFetchTitles = shouldAppend => ({
  type: CALL_FETCH_TITLES,
  payload: {
    shouldAppend
  }
});

export const fetchTitlesSuccess = ({ count, titles }) => ({
  type: FETCH_TITLES_SUCCESS,
  payload: {
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

export const callSetTitleRating = ({ titleId, rating }) => ({
  type: CALL_SET_TITLE_RATING,
  payload: {
    titleId,
    rating
  }
});
