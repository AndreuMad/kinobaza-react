import Axios from 'axios';

import {
    FETCH_POSTS_SUCCESS,
    CLEAR_POSTS,
    FETCH_ARTICLE_POST_SUCCESS,
    FETCH_POST_SUCCESS
} from '../constants/actions';

import { apiUrl } from '../constants/urls';

export const fetchPosts = (params, shouldFetchArticle) => {
    return (dispatch) => {

        return Axios.get(`${apiUrl}/posts`, {
            params: {
                ...params
            }
        })
            .then(response => {
                let { data } = response;

                if(shouldFetchArticle) {
                    const articleItem = data.filter(item => item.important);
                    const articleItemId = articleItem.length ? articleItem[0]._id : data[0]._id;
                    dispatch(fetchArticlePost(articleItemId));
                    data = data.filter(item => item._id !== articleItemId);
                }

                dispatch(fetchPostsSuccess(data));
            })
            .catch(error => {
                throw(error);
            });
    }
};

export const fetchPostsSuccess = (posts) => {
    return {
        type: FETCH_POSTS_SUCCESS,
        posts
    }
};

export const clearPosts = () => {
    return {
        type: CLEAR_POSTS
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

export const fetchArticlePost = (id) => {
    return (dispatch) => {

        return Axios.get(`${apiUrl}/posts/${id}`)
            .then(response => {
                dispatch(fetchArticlePostSuccess(response.data));
            })
            .catch(error => {
                throw(error);
            })
    }
};

export const fetchArticlePostSuccess = (articlePost) => {

    return {
        type: FETCH_ARTICLE_POST_SUCCESS,
        articlePost
    }
};
