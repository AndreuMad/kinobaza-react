// Constants

export const CALL_FETCH_REVIEWS = 'CALL_FETCH_REVIEWS';
const FETCH_REVIEWS_STATUS = 'FETCH_REVIEWS_STATUS';
const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
const FETCH_UP_REVIEWS_SUCCESS = 'FETCH_UP_REVIEWS_SUCCESS';
const FETCH_REVIEW_SUCCESS = 'FETCH_REVIEW_SUCCESS';
const RATE_REVIEW_STATUS = 'RATE_REVIEW_STATUS';

const initialState = {
  reviews: [],
  reviewsTotalCount: 0,
  fetchReviewsStatus: true
};

// Actions
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

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_REVIEWS_STATUS:
      return {
        ...state,
        fetchReviewsStatus: payload.status
      };

    case FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        reviewsTotalCount: payload.total,
        reviews: payload.reviews
      };
    case FETCH_UP_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          ...payload.reviews
        }
      };

    default:
      return state;
  }
};

