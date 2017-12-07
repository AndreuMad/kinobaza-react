import {
  CALL_FETCH_POSTS,
  FETCH_POSTS_STATUS,
  FETCH_POSTS_SUCCESS,
  FETCH_ARTICLE_POST_SUCCESS,
  CLEAR_POSTS,
  CALL_FETCH_POST,
  FETCH_POST_SUCCESS
} from 'Constants/actions';

export const callFetchPosts = (params, shouldFetchArticle) => ({
  type: CALL_FETCH_POSTS,
  params,
  shouldFetchArticle
});

export const fetchPostsStatus = status => ({
  type: FETCH_POSTS_STATUS,
  status
});

export const fetchPostsSuccess = ({ posts, count }) => ({
  type: FETCH_POSTS_SUCCESS,
  postsData: {
    posts,
    count
  }
});

export const fetchArticlePostSuccess = articlePost => ({
  type: FETCH_ARTICLE_POST_SUCCESS,
  articlePost
});

export const clearPosts = () => ({
  type: CLEAR_POSTS
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
