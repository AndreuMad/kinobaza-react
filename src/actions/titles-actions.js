import Axios from 'axios';

import {
    FETCH_TITLES_STATUS,
    FETCH_TITLES_SUCCESS,
    FETCH_UP_TITLES_SUCCESS,
    CLEAR_TITLES,
    CHANGE_TITLES_PARAMS,
    FETCH_TITLE_SUCCESS
} from 'Constants/actions'

import { apiUrl } from '../constants/urls';

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
                const { count, year, titles } = response.data;

                if(appendTitles) {
                    dispatch(fetchUpTitlesSuccess(titles));
                } else {
                    dispatch(fetchTitlesSuccess({ count, year, titles }));
                }

                dispatch(fetchTitlesStatus(true));
            })
            .catch(error => {
                throw(error);
            });
    }
};

export const fetchTitlesSuccess = ({ count, year, titles }) => {
    return {
        type: FETCH_TITLES_SUCCESS,
        titlesData: {
            count,
            year,
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

export const changeTitlesParams = (params) => {
    return {
        type: CHANGE_TITLES_PARAMS,
        params
    }
};

