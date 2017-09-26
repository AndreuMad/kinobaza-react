import {
    FETCH_TITLES_STATUS,
    FETCH_TITLES_SUCCESS,
    CLEAR_TITLES,
    CHANGE_TITLES_PARAMS
} from '../constants/actions';

const defaultTitlesState = {
    titles: [],
    titlesTotalCount: null,
    titlesParams: {
        name: '',
        genre: [],
        year: {
            min: 1878,
            max: 2017
        },
        score: {
            min: 1,
            max: 10
        }
    },
    fetchTitlesStatus: true
};

export const titlesReducer = (state = defaultTitlesState, action) => {

    switch(action.type) {

        case FETCH_TITLES_STATUS:
            return {
                ...state,
                fetchTitlesStatus: action.status
            };

        case FETCH_TITLES_SUCCESS:
            return {
                ...state,
                titles: action.titlesData.titles,
                titlesTotalCount: action.titlesData.count
            };

        case CLEAR_TITLES:
            return {
                ...state,
                titles: [],
                titlesTotalCount: 0
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
