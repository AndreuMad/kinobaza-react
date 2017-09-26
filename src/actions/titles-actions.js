import Axios from 'axios';

import {
    FETCH_TITLE_SUCCESS,
    FETCH_TITLES_SUCCESS,
    CHANGE_TITLES_PARAMS
} from '../constants/actions'

import { apiUrl } from '../constants/urls';

export const fetchTitles = (params) => {
    return (dispatch) => {

        return Axios.get(`${apiUrl}/titles`, {
            params: {
                ...params
            }
        })
            .then(response => {
                dispatch(fetchTitlesSuccess(response.data));
            })
            .catch(error => {
                throw(error);
            });
    }
};

export const fetchTitlesSuccess = (titles) => {
    return {
        type: FETCH_TITLES_SUCCESS,
        titles
    }
};

export const changeTitlesParams = (params) => {
    return {
        type: CHANGE_TITLES_PARAMS,
        params
    }
};

