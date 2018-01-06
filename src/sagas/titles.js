import 'regenerator-runtime/runtime';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  apiFetchTitles,
  apiSetTitleRating
} from 'Api/titles';

import {
  fetchTitlesStatus,
  fetchTitlesSuccess,
  fetchUpTitlesSuccess
} from 'Actions/titles-actions'

import {
  CALL_FETCH_TITLES,
  CALL_SET_TITLE_RATING
} from 'Constants/actions';

function* fetchTitles(action) {
  try {
    const { shouldAppend } = action.payload;
    const query = yield select(({
      auth: { user: { _id: userId } },
      titles: { titles, titlesQuery }
    }) => ({
      ...titlesQuery,
      skip: shouldAppend ? titles.length : 0,
      limit: 3,
      userId
    }));

    yield put(fetchTitlesStatus(false));

    const { count, titles } = yield call(apiFetchTitles, query);

    if (shouldAppend) {
      yield put(fetchUpTitlesSuccess(titles));
    } else {
      yield put(fetchTitlesSuccess({ count, titles }));
    }

    yield put(fetchTitlesStatus(true));
  } catch (error) {
    console.log(error);
  }
}

function* setTitleRating(action) {
  try {
    const { titleId, rating } = action.payload;
    const userId = yield select(({ auth: { user: { _id: userId } } }) => userId);

    const response = yield call(apiSetTitleRating, { userId, titleId, rating });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

function* saga() {
  yield takeLatest(CALL_FETCH_TITLES, fetchTitles);
  yield takeLatest(CALL_SET_TITLE_RATING, setTitleRating);
}

export default saga;
