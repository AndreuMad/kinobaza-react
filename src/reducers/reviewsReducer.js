import {
  FETCH_REVIEWS_STATUS,
  FETCH_REVIEWS_SUCCESS,
  FETCH_UP_REVIEWS_SUCCESS,
  FETCH_REVIEW_SUCCESS,
  RATE_REVIEW_STATUS
} from 'Constants/actions';


const defaultReviewsState = {
  reviews: [],
  reviewsTotalCount: 0,
  fetchReviewsStatus: true
};

export const reviewsReducer = (state = defaultReviewsState, action) => {
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
