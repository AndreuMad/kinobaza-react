import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE
} from '../constants/actions';

export const authReducer = (state = {}, action) => {
    switch(action.type) {
        case AUTH_USER:
            return {
                ...state,
                authenticated: true,
                name: action.name,
                error: null
            };
        case UNAUTH_USER:
            return {
                ...state,
                authenticated: false,
                error: null
            };
        case AUTH_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case FETCH_MESSAGE:
            return {
                ...state,
                message: action.payload
            }
    }
    return state;
};

