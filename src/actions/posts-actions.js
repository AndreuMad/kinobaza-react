import Axios from 'axios';

import {
    FETCH_POSTS_STATUS,
    FETCH_POSTS_SUCCESS,
    CLEAR_POSTS,
    FETCH_ARTICLE_POST_SUCCESS,
    FETCH_POST_SUCCESS
} from '../constants/actions';

import { apiUrl } from '../constants/urls';

export const fetchPosts = (params, shouldFetchArticle) => {
    return (dispatch) => {

        dispatch(fetchPostsStatus(false));

        return Axios.get(`${apiUrl}/posts`, {
            params: {
                ...params
            }
        })
            .then(response => {
                let { data } = response;
                let { posts, count } = data;

                if(shouldFetchArticle) {
                    const articleItem = posts.filter(item => item.important);
                    const articleItemId = articleItem.length ? articleItem[0]._id : posts[0]._id;
                    dispatch(fetchArticlePost(articleItemId));
                    posts = posts.filter(item => item._id !== articleItemId);
                }

                if(posts.length) {
                    dispatch(fetchPostsSuccess({ posts, count }));
                }
                dispatch(fetchPostsStatus(true));
            })
            .catch(error => {
                throw(error);
            });
    }
};

export const fetchPostsStatus = (status) => {
    return {
        type: FETCH_POSTS_STATUS,
        status
    }
};

export const fetchPostsSuccess = ({ posts, count }) => {
    return {
        type: FETCH_POSTS_SUCCESS,
        postsData: {
            posts,
            count
        }
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
