import Axios from 'axios';

import {
    FETCH_TITLES_STATUS,
    FETCH_TITLES_SUCCESS,
    FETCH_UP_TITLES_SUCCESS,
    CLEAR_TITLES,
    CHANGE_TITLES_QUERY,
    FETCH_TITLE_SUCCESS
} from 'Constants/actions'

import { apiUrl } from 'Constants/urls';

export const fetchTitlesStatus = (status) => {
    return {
        type: FETCH_TITLES_STATUS,
        status
    }
};

export const fetchTitles = (params, appendTitles) => {
    return (dispatch) => {

        dispatch(fetchTitlesStatus(false));

        return Axios.get(`${apiUrl}/titles`, {
            params: {
                ...params
            }
        })
            .then(response => {
                const { count, titles } = response.data;

                if(appendTitles) {
                    dispatch(fetchUpTitlesSuccess(titles));
                } else {
                    dispatch(fetchTitlesSuccess({ count, titles }));
                }

                dispatch(fetchTitlesStatus(true));
            })
            .catch(error => {
                throw(error);
            });
    }
};

export const fetchTitlesSuccess = ({ count, titles }) => {
    return {
        type: FETCH_TITLES_SUCCESS,
        titlesData: {
            count,
            titles
        }
    }
};

export const fetchUpTitlesSuccess = (titles) => {
    return {
        type: FETCH_UP_TITLES_SUCCESS,
        titlesData: {
            titles
        }
    }
};

export const clearTitles = () => {
    return {
        type: CLEAR_TITLES
    }
};

export const changeTitlesQuery = (params) => {
    return {
        type: CHANGE_TITLES_QUERY,
        params
    }
};

