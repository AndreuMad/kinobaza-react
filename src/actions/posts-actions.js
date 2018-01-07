import {
  CALL_FETCH_POSTS,
  FETCH_POSTS_STATUS,
  FETCH_POSTS_SUCCESS,
  FETCH_UP_POSTS_SUCCESS,
  FETCH_ARTICLE_POST_SUCCESS,
  CLEAR_POSTS,
  CALL_FETCH_POST,
  FETCH_POST_SUCCESS
} from 'Constants/actions';

export function callFetchPosts(params, shouldAppend, shouldFetchArticle) {
  return {
    type: CALL_FETCH_POSTS,
    params,
    shouldAppend,
    shouldFetchArticle
  };
}

export function fetchPostsStatus(status) {
  return {
    type: FETCH_POSTS_STATUS,
    status
  };
}

export function fetchPostsSuccess({ posts, count }) {
  return {
    type: FETCH_POSTS_SUCCESS,
    data: {
      posts,
      count
    }
  };
}

export function fetchUpPostsSuccess({ posts }) {
  return {
    type: FETCH_UP_POSTS_SUCCESS,
    data: {
      posts
    }
  };
}

export function fetchArticlePostSuccess(articlePost) {
  return {
    type: FETCH_ARTICLE_POST_SUCCESS,
    articlePost
  };
}

export function callFetchPost(id) {
  return {
    type: CALL_FETCH_POST,
    id
  };
}

export function fetchPostSuccess({ post, comments }) {
  return {
    type: FETCH_POST_SUCCESS,
    post,
    comments
  };
}
