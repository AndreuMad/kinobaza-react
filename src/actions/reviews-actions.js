import Axios from 'axios';

import {
  CALL_FETCH_REVIEWS,
  FETCH_REVIEWS_STATUS,
  FETCH_REVIEWS_SUCCESS,
  FETCH_UP_REVIEWS_SUCCESS,
  CLEAR_REVIEWS,
  FETCH_REVIEW_SUCCESS,
  RATE_REVIEW_STATUS
} from 'Constants/actions';

import { apiUrl } from 'Constants/urls';

export function fetchReviewsStatus(status) {
  return {
    type: FETCH_REVIEWS_STATUS,
    payload: {
      status
    }
  };
}

export function callFetchReviews(shouldAppend) {
  return {
    type: CALL_FETCH_REVIEWS,
    payload: {
      shouldAppend
    }
  };
}

export function fetchReviewsSuccess(total, reviews) {
  return {
    type: FETCH_REVIEWS_SUCCESS,
    payload: {
      total,
      reviews
    }
  };
}

export function fetchUpReviewsSuccess(reviews) {
  return {
    type: FETCH_UP_REVIEWS_SUCCESS,
    payload: {
      reviews
    }
  };
}
