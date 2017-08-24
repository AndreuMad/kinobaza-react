import Axios from 'axios';

import {
    FETCH_POSTS_SUCCESS,
    FETCH_POST_SUCCESS
} from '../constants/actions';

const apiUrl = 'http://599c72fa3a19ba0011949cf1.mockapi.io';

export const fetchPosts = () => {
    return (dispatch) => {

        return Axios.get(`${apiUrl}/posts`)
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

        return Axios.get(`${apiUrl}/post/${id}`)
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
