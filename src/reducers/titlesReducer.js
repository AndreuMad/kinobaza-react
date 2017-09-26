import { FETCH_TITLES_SUCCESS } from '../constants/actions';

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

        default:
            return state;
    }
};
