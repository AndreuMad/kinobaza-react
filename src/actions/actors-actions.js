import Axios from 'axios';

import {
    FETCH_ACTORS_STATUS,
    FETCH_ACTORS_SUCCESS,
    FETCH_UP_ACTORS_SUCCESS,
    CLEAR_ACTORS,
    FETCH_ACTOR_SUCCESS,
    CHANGE_ACTORS_QUERY
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

        return Axios.get(`${apiUrl}/actors`, {
            params: params
        })
            .then(response => {
                const { total, actors } = response.data;

                if(appendActors) {
                    dispatch(fetchUpActorsSuccess(actors))
                } else {
                    dispatch(fetchActorsSuccess({ total, actors }))
                }

                dispatch(fetchActorsStatus(true));
            })
            .catch(error => {
                throw(error);
            });
    }
};

export const fetchActorsSuccess = ({ total, actors }) => {
    return {
        type: FETCH_ACTORS_SUCCESS,
        actorsData: {
            total,
            actors
        }
    }
};

export const fetchUpActorsSuccess = (actors) => {
    return {
        type: FETCH_UP_ACTORS_SUCCESS,
        actorsData: {
            actors
        }
    }
};

export const clearActors = () => {
    return {
        type: CLEAR_ACTORS
    }
};

export const changeActorsQuery = (params) => {
    return {
        type: CHANGE_ACTORS_QUERY,
        params
    }
};
