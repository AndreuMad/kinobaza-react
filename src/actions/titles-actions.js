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

export function fetchTitlesStatus(status) {
  return {
    type: FETCH_TITLES_STATUS,
    status
  };
}

export function callFetchTitles(shouldAppend) {
  return {
    type: CALL_FETCH_TITLES,
    payload: {
      shouldAppend
    }
  };
}

export function fetchTitlesSuccess({ count, titles }) {
  return {
    type: FETCH_TITLES_SUCCESS,
    payload: {
      count,
      titles
    }
  };
}

export function fetchUpTitlesSuccess(titles) {
  return {
    type: FETCH_UP_TITLES_SUCCESS,
    titlesData: {
      titles
    }
  };
}

export function callSetTitleRating({ titleId, rating }) {
  return {
    type: CALL_SET_TITLE_RATING,
    payload: {
      titleId,
      rating
    }
  };
}
