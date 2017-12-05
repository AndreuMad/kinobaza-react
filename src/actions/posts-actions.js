import Axios from 'axios';

import {
  FETCH_POSTS_STATUS,
  FETCH_POSTS_SUCCESS,
  CLEAR_POSTS,
  FETCH_ARTICLE_POST_SUCCESS,
  FETCH_POST_SUCCESS
} from 'Constants/actions';

import { apiUrl } from 'Constants/urls';


export const fetchPostsStatus = status => ({
  type: FETCH_POSTS_STATUS,
  status
});

export const fetchArticlePostSuccess = post => ({
  type: FETCH_ARTICLE_POST_SUCCESS,
  post
});

export const fetchPostSuccess = (post, comments) => ({
  type: FETCH_POST_SUCCESS,
  post,
  comments
});

export const fetchPostsSuccess = ({ posts, count }) => ({
  type: FETCH_POSTS_SUCCESS,
  postsData: {
    posts,
    count
  }
});

export const clearPosts = () => ({
  type: CLEAR_POSTS
});

export const fetchArticlePost = id => (
  dispatch => (
    Axios.get(`${apiUrl}/posts/${id}`)
      .then(({ data: { post } }) => {
        dispatch(fetchArticlePostSuccess(post));
      })
      .catch((error) => {
        throw (error);
      })
  )
);

export const fetchPosts = (params, shouldFetchArticle) => (
  (dispatch) => {
    dispatch(fetchPostsStatus(false));

    return Axios.get(`${apiUrl}/posts`, {
      params: {
        ...params
      }
    })
      .then(({ data }) => {
        let { posts, count } = data;

        if (shouldFetchArticle) {
          const articleItem = posts.filter(item => item.important);
          const articleItemId = articleItem.length ? articleItem[0]._id : posts[0]._id;
          dispatch(fetchArticlePost(articleItemId));
          posts = posts.filter(item => item._id !== articleItemId);
        }

        if (posts.length) {
          dispatch(fetchPostsSuccess({ posts, count }));
        }

        dispatch(fetchPostsStatus(true));
      })
      .catch((error) => {
        throw (error);
      });
  }
);

export const fetchPost = id => (
  dispatch => (
    Axios.get(`${apiUrl}/posts/${id}`)
      .then(({ data: { post, comments } }) => {
        dispatch(fetchPostSuccess(post, comments));
      })
      .catch((error) => {
        throw (error);
      }))
);
