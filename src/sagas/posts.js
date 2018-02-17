import 'regenerator-runtime/runtime';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  apiFetchPosts,
  apiFetchPost,
  apiCreateComment
} from 'Api/posts';

import {
  fetchPostsStatus,
  fetchPostsSuccess,
  fetchUpPostsSuccess,
  fetchPostSuccess,
  createCommentSuccess
} from 'Ducks/posts';

import {
  CALL_FETCH_POSTS,
  CALL_FETCH_POST,
  CALL_CREATE_COMMENT
} from 'Ducks/posts';

function* fetchPosts(action) {
  try {
    const { params, shouldAppend } = action.payload;
    const query = yield select(({
      posts: { posts }
    }) => ({
      ...params,
      skip: shouldAppend ? posts.length : 0,
      shouldLoadArticle: !shouldAppend
    }));

    yield put(fetchPostsStatus(false));
    const { posts, count } = yield call(apiFetchPosts, query);

    if (!shouldAppend) {
      yield put(fetchPostsSuccess({ posts, count }));
    } else {
      yield put(fetchUpPostsSuccess({ posts }));
    }

    yield put(fetchPostsStatus(true));
  } catch (error) {
    console.log(error);
  }
}

function* fetchPost(action) {
  try {
    const { id } = action.payload;
    const { post, comments } = yield call(apiFetchPost, id);
    yield put(fetchPostSuccess({ post, comments }));
  } catch (error) {
    console.log(error);
  }
}

function* createComment(action) {
  try {
    const { postId, comment } = action.payload;
    const userId = yield select(({
      auth: { user: { _id } }
    }) => _id);
    const response = yield call(apiCreateComment, { userId, postId, comment });
    yield put(createCommentSuccess(response));
  } catch (error) {
    console.log(error);
  }
}

function* saga() {
  yield takeLatest(CALL_FETCH_POSTS, fetchPosts);
  yield takeLatest(CALL_FETCH_POST, fetchPost);
  yield takeLatest(CALL_CREATE_COMMENT, createComment);
}

export default saga;
