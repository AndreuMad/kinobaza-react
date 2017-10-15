import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
} from 'Constants/actions';

export const authReducer = (state = {}, action) => {
    switch(action.type) {
        case AUTH_USER:
            return {
                ...state,
                authenticated: true,
                id: action.data.id,
                name: action.data.name,
                error: null
            };
            break;
        case UNAUTH_USER:
            return {
                ...state,
                authenticated: false,
                error: null
            };
            break;
        case AUTH_ERROR:
            return {
                ...state,
                error: action.payload
            };
    }
    return state;
};

