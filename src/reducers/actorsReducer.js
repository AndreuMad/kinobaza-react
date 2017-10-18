import {
    FETCH_ACTORS_STATUS,
    FETCH_ACTORS_SUCCESS,
    FETCH_UP_ACTORS_SUCCESS,
    CLEAR_ACTORS,
    FETCH_ACTOR_SUCCESS,
    CHANGE_ACTORS_QUERY
} from 'Constants/actions';

const defaultActorsState = {
    actors: [],
    actorsTotalCount: 0,
    actorsQuery: {
        name: ''
    },
    fetchActorsStatus: true
};

export const actorsReducer = (state = defaultActorsState, action) => {

    switch(action.type) {
        case FETCH_ACTORS_STATUS:
            return {
                ...state,
                fetchActorsStatus: action.status
            };

        case FETCH_ACTORS_SUCCESS:
            return {
                ...state,
                actors: action.actorsData.actors,
                actorsTotalCount: action.actorsData.total
            };

        case FETCH_UP_ACTORS_SUCCESS:
            return {
                ...state,
                actors: [
                    ...state.actors,
                    ...action.actorsData.actors
                ]
            };

        case CLEAR_ACTORS:
            return {
                ...state,
                actors: [],
                actorsTotalCount: 0
            };

        case CHANGE_ACTORS_QUERY:
            return {
                ...state,
                actorsQuery: {
                    ...state.actorsQuery,
                    ...action.params
                }
            };

        default:
            return state;
    }
};
