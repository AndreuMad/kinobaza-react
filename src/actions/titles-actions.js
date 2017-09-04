import Axios from 'axios';

import {
    FETCH_TITLE_SUCCESS,
    FETCH_TITLES_SUCCESS
} from '../constants/actions'

import { apiUrl } from '../constants/urls';

export const fetchTitles = () => {
    return (dispatch) => {

        return Axios.get(`${apiUrl}/titles`)
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
