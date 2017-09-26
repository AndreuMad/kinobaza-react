import Axios from 'axios';

import {
    FETCH_TITLES_STATUS,
    FETCH_TITLES_SUCCESS,
    CLEAR_TITLES,
    CHANGE_TITLES_PARAMS,
    FETCH_TITLE_SUCCESS
} from '../constants/actions'

import { apiUrl } from '../constants/urls';

export const fetchTitlesStatus = (status) => {
    return {
        type: FETCH_TITLES_STATUS,
        status
    }
};

export const fetchTitles = (params) => {
    return (dispatch) => {

        dispatch(fetchTitlesStatus(false));

        return Axios.get(`${apiUrl}/titles`, {
            params: {
                ...params
            }
        })
            .then(response => {
                const { titles, count } = response.data;
                if(titles.length) {
                    dispatch(fetchTitlesSuccess({ titles, count }));
                }
                dispatch(fetchTitlesStatus(true));
            })
            .catch(error => {
                throw(error);
            });
    }
};

export const fetchTitlesSuccess = ({ titles, count }) => {
    return {
        type: FETCH_TITLES_SUCCESS,
        titlesData: {
            titles,
            count
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

