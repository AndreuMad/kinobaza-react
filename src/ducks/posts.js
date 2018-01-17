// Constants
export const CALL_FETCH_POSTS = 'CALL_FETCH_POSTS';
export const CALL_FETCH_POST = 'CALL_FETCH_POST';
export const CALL_CREATE_COMMENT = 'CALL_CREATE_COMMENT';

const FETCH_POSTS_STATUS = 'FETCH_POSTS_STATUS';
const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
const FETCH_UP_POSTS_SUCCESS = 'FETCH_UP_POSTS_SUCCESS';
const FETCH_ARTICLE_POST_SUCCESS = 'FETCH_ARTICLE_POST_SUCCESS';
const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';

const defaultPostsState = {
  posts: [],
  postsTotalCount: 0,
  articlePost: null,
  fetchPostsStatus: true,
  post: null,
  comments: []
};

// Actions
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

export function callCreateComment({ postId, comment }) {
  return {
    type: CALL_CREATE_COMMENT,
    payload: {
      postId,
      comment
    }
  };
}

export function createCommentSuccess(comment) {
  return {
    type: CREATE_COMMENT_SUCCESS,
    payload: {
      comment
    }
  };
}

export const reducer = (state = defaultPostsState, action) => {
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
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [
          payload.comment,
          ...state.comments
        ]
      };

    default:
      return state;
  }
};
