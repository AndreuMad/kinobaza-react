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

export const reviewsReducer = (state = defaultReviewsState, action) => {
    switch (action.type) {

        case FETCH_REVIEWS_STATUS:
            return {
                ...state,
                fetchReviewsStatus: action.status
            };

        case FETCH_REVIEWS_SUCCESS:
            return {
                ...state,
                reviewsTotalCount: action.reviewsData.total,
                reviews: action.reviewsData.reviews
            };
        case FETCH_UP_REVIEWS_SUCCESS:
            return {
                ...state,
                reviews: {
                    ...state.reviews,
                    ...action.reviewsData.reviews
                }
            };
        case CLEAR_REVIEWS:
            return defaultReviewsState;

        default:
            return state;
    }
};
