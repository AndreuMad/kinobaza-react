import 'regenerator-runtime/runtime';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  apiFetchPosts,
  apiFetchArticlePost,
  apiFetchPost
} from 'Api/posts';

import {
  fetchPostsStatus,
  fetchPostsSuccess,
  fetchUpPostsSuccess,
  fetchArticlePostSuccess,
  fetchPostSuccess
} from 'Actions/posts-actions';

import {
  CALL_FETCH_POSTS,
  CALL_FETCH_POST
} from 'Constants/actions';

function* fetchPosts({ params, shouldAppend, shouldFetchArticle }) {
  try {
    const query = yield select(({
      posts: { posts }
    }) => ({
      ...params,
      skip: shouldAppend ? posts.length + 1 : 0
    }));

    yield put(fetchPostsStatus(false));
    let { posts, count } = yield call(apiFetchPosts, query);
    let articlePost;

    if (shouldFetchArticle) {
      const articleItem = posts.filter(item => item.important);
      const articlePostId = articleItem.length ? articleItem[0]._id : posts[0]._id;
      articlePost = yield call(apiFetchArticlePost, articlePostId);
      posts = posts.filter(item => item._id !== articlePostId);

      yield put(fetchArticlePostSuccess(articlePost));
    }

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

function* fetchPost({ id }) {
  try {
    const { post, comments } = yield call(apiFetchPost, id);
    yield put(fetchPostSuccess({ post, comments }));
  } catch (error) {
    console.log(error);
  }
}

function* watchPosts() {
  yield takeLatest(CALL_FETCH_POSTS, fetchPosts);
  yield takeLatest(CALL_FETCH_POST, fetchPost);
}

export default watchPosts;
