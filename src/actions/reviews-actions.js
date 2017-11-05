import Axios from 'axios';

import {
    FETCH_REVIEWS_STATUS,
    FETCH_REVIEWS_SUCCESS,
    FETCH_UP_REVIEWS_SUCCESS,
    CLEAR_REVIEWS,
    FETCH_REVIEW_SUCCESS,
    RATE_REVIEW_STATUS
} from 'Constants/actions';

import { apiUrl } from 'Constants/urls';

export const fetchReviewsStatus = (status) => {
    return {
        type: FETCH_REVIEWS_STATUS,
        status
    }
};

export const fetchReviews = (params, appendReviews) => {
    return (dispatch) => {
        dispatch(fetchReviewsStatus(false));

        return Axios.get(`${apiUrl}/reviews`, {
            params
        })
            .then(({ data: { total, reviews } }) => {
                console.log(reviews);
                if(appendReviews) {
                    dispatch(fetchUpReviewsSuccess(reviews));
                } else {
                    dispatch(fetchReviewsSuccess(total, reviews));
                }

                dispatch(fetchReviewsStatus(true));
            })
            .catch(error => {
                throw(error)
            });
    }
};

export const fetchReviewsSuccess = (total, reviews) => {
    return {
        type: FETCH_REVIEWS_SUCCESS,
        reviewsData: {
            total,
            reviews
        }
    }
};

export const fetchUpReviewsSuccess = (reviews) => {
    return {
        type: FETCH_UP_REVIEWS_SUCCESS,
        reviewsData: {
            reviews
        }
    }
};
