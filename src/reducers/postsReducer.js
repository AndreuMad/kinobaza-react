import {
  FETCH_POSTS_STATUS,
  FETCH_POSTS_SUCCESS,
  FETCH_UP_POSTS_SUCCESS,
  FETCH_ARTICLE_POST_SUCCESS,
  FETCH_POST_SUCCESS,
  POST_COMMENT_SUCCESS
} from 'Constants/actions';

const defaultPostsState = {
  posts: [],
  postsTotalCount: 0,
  articlePost: null,
  fetchPostsStatus: true,
  post: null,
  comments: []
};

export const postsReducer = (state = defaultPostsState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_POSTS_STATUS:
      return {
        ...state,
        fetchPostsStatus: payload.status
      };

    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: payload.posts,
        postsTotalCount: payload.count
      };

    case FETCH_UP_POSTS_SUCCESS:
      return {
        ...state,
        posts: [
          ...state.posts,
          ...payload.posts
        ]
      };

    case FETCH_ARTICLE_POST_SUCCESS:
      return {
        ...state,
        articlePost: payload.articlePost
      };

    case FETCH_POST_SUCCESS:
      return {
        ...state,
        post: payload.post,
        comments: payload.comments
      };
    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [
          ...state.comments,
          payload.comment
        ]
      };

    default:
      return state;
  }
};
