import Axios from 'axios';

import {
    FETCH_POSTS_SUCCESS,
    FETCH_BIG_POST_SUCCESS,
    FETCH_POST_SUCCESS
} from '../constants/actions';

import { apiUrl } from '../constants/urls';

export const fetchPosts = (params) => {
    return (dispatch) => {

        return Axios.get(`${apiUrl}/posts`, {
            params: {
                ...params
            }
        })
            .then(response => {
                dispatch(fetchPostsSuccess(response.data));
            })
            .catch(error => {
                throw(error);
            });
    }
};

export const fetchPostsSuccess = (postsList) => {
    return {
        type: FETCH_POSTS_SUCCESS,
        postsList
    }
};

export const fetchPost = (id) => {
    return (dispatch) => {

        return Axios.get(`${apiUrl}/posts/${id}`)
            .then(response => {
                dispatch(fetchPostSuccess(response.data));
            })
            .catch(error => {
                throw(error);
            })
    }
};

export const fetchPostSuccess = (post) => {

    return {
        type: FETCH_POST_SUCCESS,
        post
    }
};

export const fetchBigPost = (id) => {
    return (dispatch) => {

        return Axios.get(`${apiUrl}/posts/${id}`)
            .then(response => {
                dispatch(fetchBigPostSuccess(response.data));
            })
            .catch(error => {
                throw(error);
            })
    }
};

export const fetchBigPostSuccess = (bigPost) => {

    return {
        type: FETCH_BIG_POST_SUCCESS,
        bigPost
    }
};
