import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_STATUS,
    AUTH_ERROR
} from 'Constants/actions';

const defaultState = {
    authenticated: false,
    status: true,
    id: null,
    name: null,
    dateOfBirth: null,
    error: null
};

export const authReducer = (state = defaultState, action) => {
    switch(action.type) {
        case AUTH_STATUS:
            return {
                ...state,
                status: action.status
            };

        case AUTH_USER:
            const {
                data: {
                    id,
                    name,
                    dateOfBirth
                }
            } = action;

            return {
                ...state,
                authenticated: true,
                id: id,
                name: name,
                dateOfBirth: dateOfBirth,
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
                error: action.error
            };
    }
    return state;
};

