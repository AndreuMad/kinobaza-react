import {
    FETCH_POSTS_SUCCESS,
    FETCH_POST_SUCCESS
} from '../constants/actions';

const defaultPostsState = {
    post: null,
    postsList: null
};

export const postsReducer = (state = defaultPostsState, action) => {

    switch(action.type) {

        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                postsList: action.postsList
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
