import {
    DEFINE_NIGHT_MODE
} from 'Constants/actions';

const defaultState = {
    nightMode: true
};

export const appReducer = (state = defaultState, action) => {
    switch(action.type) {
        case DEFINE_NIGHT_MODE:
            return {
                ...state,
                nightMode: action.nightMode
            };
        default:
            return state;
    }
};
