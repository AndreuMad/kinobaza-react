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

export const callFetchPosts = (params, shouldAppend, shouldFetchArticle) => ({
  type: CALL_FETCH_POSTS,
  params,
  shouldAppend,
  shouldFetchArticle
});

export const fetchPostsStatus = status => ({
  type: FETCH_POSTS_STATUS,
  status
});

export const fetchPostsSuccess = ({ posts, count }) => ({
  type: FETCH_POSTS_SUCCESS,
  data: {
    posts,
    count
  }
});

export const fetchUpPostsSuccess = ({ posts }) => ({
  type: FETCH_UP_POSTS_SUCCESS,
  data: {
    posts
  }
});

export const fetchArticlePostSuccess = articlePost => ({
  type: FETCH_ARTICLE_POST_SUCCESS,
  articlePost
});

export const callFetchPost = id => ({
  type: CALL_FETCH_POST,
  id
});

export const fetchPostSuccess = ({ post, comments }) => ({
  type: FETCH_POST_SUCCESS,
  post,
  comments
});
