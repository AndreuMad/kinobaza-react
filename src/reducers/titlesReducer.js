import {
    FETCH_TITLES_SUCCESS,
    CHANGE_TITLES_PARAMS
} from '../constants/actions';

const defaultTitlesState = {
    titles: [],
    titlesTotalCount: null,
    titlesParams: null,
    fetchTitlesStatus: true
};

export const titlesReducer = (state = defaultTitlesState, action) => {

    switch(action.type) {

        case FETCH_TITLES_SUCCESS:
            return {
                ...state,
                titles: action.titles
            };

        case CHANGE_TITLES_PARAMS:
            return {
                ...state,
                titlesParams: {
                    ...state.titlesParams,
                    ...action.params
                }
            };

        default:
            return state;
    }
};
