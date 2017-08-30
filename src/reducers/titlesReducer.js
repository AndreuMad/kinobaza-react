import { FETCH_TITLES_SUCCESS } from '../constants/actions';

const defaultTitlesState = [];

export const titlesReducer = (state = defaultTitlesState, action) => {

    switch(action.type) {

        case FETCH_TITLES_SUCCESS:
            return {
                titlesList: action.titles
            };

        default:
            return state;
    }
};
