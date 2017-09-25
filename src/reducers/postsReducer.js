import {
    FETCH_POSTS_SUCCESS,
    CLEAR_POSTS,
    FETCH_ARTICLE_POST_SUCCESS,
    FETCH_POST_SUCCESS
} from '../constants/actions';

const defaultPostsState = {
    post: null,
    posts: []
};

export const postsReducer = (state = defaultPostsState, action) => {

    switch(action.type) {

        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    ...action.posts
                ]
            };

        case CLEAR_POSTS:
            return {
                ...state,
                posts: []
            };

        case FETCH_ARTICLE_POST_SUCCESS:
            return {
                ...state,
                articlePost: action.articlePost
            };

        case FETCH_POST_SUCCESS:
            return {
                ...state,
                post: action.post
            };

        default:
            return state;
    }
};
