import Axios from 'axios';

import {
    FETCH_ACTORS_STATUS,
    FETCH_ACTORS_SUCCESS,
    FETCH_UP_ACTORS_SUCCESS,
    CLEAR_ACTORS,
    FETCH_ACTOR_SUCCESS
} from 'Constants/actions';

import { apiUrl } from 'Constants/urls';

export const fetchActorsStatus = (status) => {
    return {
        type: FETCH_ACTORS_STATUS,
        status
    }
};

export const fetchActors = (params, appendActors) => {
    return (dispatch) => {

        dispatch(fetchActorsStatus(false));
    }
};
