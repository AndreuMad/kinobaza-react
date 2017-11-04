import {
    FETCH_REVIEWS_STATUS,
    FETCH_REVIEWS_SUCCESS,
    FETCH_UP_REVIEWS_SUCCESS,
    CLEAR_REVIEWS,
    FETCH_REVIEW_SUCCESS,
    RATE_REVIEW_STATUS
} from 'Constants/actions';


const defaultReviewsState = {
    reviews: [],
    reviewsTotalCount: 0,
    fetchReviewsStatus: true
};
