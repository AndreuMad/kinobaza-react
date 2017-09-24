import {
    FETCH_POSTS_SUCCESS,
    FETCH_BIG_POST_SUCCESS,
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

        case FETCH_BIG_POST_SUCCESS:
            return {
                ...state,
                bigPost: action.bigPost
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
