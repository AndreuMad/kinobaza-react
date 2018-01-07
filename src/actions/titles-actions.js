import {
  CALL_FETCH_TITLES,
  CALL_SET_TITLE_RATING,
  CALL_CHANGE_TITLES_QUERY,
  FETCH_TITLES_STATUS,
  FETCH_TITLES_SUCCESS,
  FETCH_UP_TITLES_SUCCESS,
  FETCH_TITLE_SUCCESS,
  CHANGE_TITLES_QUERY
} from 'Constants/actions'

import { apiUrl } from 'Constants/urls';

export function callFetchTitles(shouldAppend) {
  return {
    type: CALL_FETCH_TITLES,
    payload: {
      shouldAppend
    }
  };
}

export function callChangeTitlesQuery(query) {
  return {
    type: CALL_CHANGE_TITLES_QUERY,
    payload: {
      query
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

export function fetchTitlesStatus(status) {
  return {
    type: FETCH_TITLES_STATUS,
    payload: {
      status
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
    payload: {
      titles
    }
  };
}

export function changeTitlesQuery(query) {
  return {
    type: CHANGE_TITLES_QUERY,
    payload: {
      query
    }
  };
}
