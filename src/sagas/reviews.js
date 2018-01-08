import 'regenerator-runtime/runtime';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  apiFetchReviews
} from 'Api/reviews';

import {
  fetchReviewsStatus,
  fetchReviewsSuccess,
  fetchUpReviewsSuccess
} from 'Actions/reviews-actions';

import {
  CALL_FETCH_REVIEWS
} from 'Constants/actions';

function* fetchReviews(action) {
  try {
    const { shouldAppend } = action.payload;
    const query = yield select(({
      auth: { user: { _id: userId } },
      reviews: { reviews, reviewsQuery }
    }) => ({
      ...reviewsQuery,
      skip: shouldAppend ? reviews.length : 0,
      limit: 3,
      userId
    }));

    yield put(fetchReviewsStatus(false));

    const { total, reviews } = yield call(apiFetchReviews, query);

    if (shouldAppend) {
      yield put(fetchUpReviewsSuccess(reviews));
    } else {
      yield put(fetchReviewsSuccess(total, reviews));
    }

    yield put(fetchReviewsStatus(true));
  } catch (error) {
    console.log(error);
  }
}

function* saga() {
  yield takeLatest(fetchReviews);
}

export default saga;
