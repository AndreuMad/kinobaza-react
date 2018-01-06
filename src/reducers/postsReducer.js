import {
  FETCH_POSTS_STATUS,
  FETCH_POSTS_SUCCESS,
  FETCH_UP_POSTS_SUCCESS,
  CLEAR_POSTS,
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
  switch (action.type) {
    case FETCH_POSTS_STATUS:
      return {
        ...state,
        fetchPostsStatus: action.status
      };

    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.data.posts,
        postsTotalCount: action.data.count
      };

    case FETCH_UP_POSTS_SUCCESS:
      return {
        ...state,
        posts: [
          ...state.posts,
          ...action.data.posts
        ]
      };

    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
        postsTotalCount: 0,
        articlePost: null
      };

    case FETCH_ARTICLE_POST_SUCCESS:
      return {
        ...state,
        articlePost: action.articlePost
      };

    case FETCH_POST_SUCCESS:
      return {
        ...state,
        post: action.post,
        comments: action.comments
      };
    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [
          action.comment,
          ...state.comments
        ]
      };

    default:
      return state;
  }
};
