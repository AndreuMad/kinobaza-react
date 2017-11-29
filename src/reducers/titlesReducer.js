import {
    FETCH_TITLES_STATUS,
    FETCH_TITLES_SUCCESS,
    FETCH_UP_TITLES_SUCCESS,
    CLEAR_TITLES
} from 'Constants/actions';

const defaultTitlesState = {
    titles: [],
    titlesTotalCount: 0,
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
                titlesTotalCount: action.titlesData.count,
            };

        case FETCH_UP_TITLES_SUCCESS:
            return {
                ...state,
                titles: [
                    ...state.titles,
                    ...action.titlesData.titles
                ]
            };

        case CLEAR_TITLES:
            return {
                ...state,
                titles: [],
                titlesTotalCount: 0
            };

        default:
            return state;
    }
};
