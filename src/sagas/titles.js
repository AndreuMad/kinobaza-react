import 'regenerator-runtime/runtime';
import { call, put, select, all, takeEvery } from 'redux-saga/effects';

import {
  apiFetchTitles,
  apiSetTitleRating
} from 'Api/titles';

import {
  fetchTitlesStatus,
  fetchTitlesSuccess,
  fetchUpTitlesSuccess,
  changeTitlesQuery
} from 'Ducks/titles'

import {
  CALL_FETCH_TITLES,
  CALL_CHANGE_TITLES_QUERY,
  CALL_SET_TITLE_RATING
} from 'Ducks/titles';

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

function* changeQuery(action) {
  try {
    const { query } = action.payload;
    yield put(changeTitlesQuery(query));
    yield fetchTitles({ payload: { shouldAppend: false } });
  } catch (error) {
    console.log(error);
  }
}

function* setTitleRating(action) {
  try {
    const { titleId, rating } = action.payload;
    const userId = yield select(({ auth: { user: { _id: userId } } }) => userId);

    const response = yield call(apiSetTitleRating, { userId, titleId, rating });
  } catch (error) {
    console.log(error);
  }
}

function* saga() {
  yield all([
    takeEvery(CALL_FETCH_TITLES, fetchTitles),
    takeEvery(CALL_SET_TITLE_RATING, setTitleRating),
    takeEvery(CALL_CHANGE_TITLES_QUERY, changeQuery)
  ]);
}

export default saga;
