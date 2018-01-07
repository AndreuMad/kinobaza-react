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
    payload: {
      params,
      shouldAppend,
      shouldFetchArticle
    }
  };
}

export function fetchPostsStatus(status) {
  return {
    type: FETCH_POSTS_STATUS,
    payload: {
      status
    }
  };
}

export function fetchPostsSuccess({ posts, count }) {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: {
      posts,
      count
    }
  };
}

export function fetchUpPostsSuccess({ posts }) {
  return {
    type: FETCH_UP_POSTS_SUCCESS,
    payload: {
      posts
    }
  };
}

export function fetchArticlePostSuccess(articlePost) {
  return {
    type: FETCH_ARTICLE_POST_SUCCESS,
    payload: {
      articlePost
    }
  };
}

export function callFetchPost(id) {
  return {
    type: CALL_FETCH_POST,
    payload: {
      id
    }
  };
}

export function fetchPostSuccess({ post, comments }) {
  return {
    type: FETCH_POST_SUCCESS,
    payload: {
      post,
      comments
    }
  };
}
